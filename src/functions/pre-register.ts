import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'
import { eq } from 'drizzle-orm'
import { createDrizzle } from '../create-drizzle'
import {
  chooseMailer,
  Mailer,
  MailerSendOptions,
  resendMailer,
  sendgridMailer,
} from '../mailer'
import { UserInsert, users, validateUserInsert } from '../schema'
import { formValidationErrors } from '../utils/form-validation-errors'

import * as Sqrl from 'squirrelly'
import PreRegistration from '../email/compiled/PreRegistration'

const fromAddress = process.env['MailerInfoFrom']!
const subjectTemplate = process.env['MailerInfoSubject']!

const createDB = createDrizzle(process.env['DatabaseConnectionString']!)

const mailer: Mailer = process.env['Mailer']
  ? chooseMailer(process.env['Mailer'])
  : process.env.NODE_ENV === 'production'
  ? sendgridMailer
  : resendMailer

console.log(`\x1b[32m\x1b[40m Using mailer: ${mailer.name} \x1b[0m`)

// TODO: success/error message builder
// TODO: check for success on email sending
export async function handleBuapPreRegister(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const db = await createDB

  const userData = (await request.json()) as UserInsert

  const isValidUser = validateUserInsert.test(userData)

  if (!isValidUser) {
    const formErrors = formValidationErrors(validateUserInsert.errors(userData))

    return {
      status: 400,
      jsonBody: {
        success: false,
        error: 'invalidFormData',
        formErrors: formErrors,
      },
    }
  }

  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, userData.email),
  })

  if (existingUser) {
    return {
      status: 409,
      jsonBody: { success: false, error: 'userAlreadyExists' },
    }
  }

  try {
    await db.insert(users).values(userData)
  } catch {
    return {
      status: 500,
      jsonBody: { success: false, error: 'databaseError' },
    }
  }

  // const emailTemplate = await vueEmail.render('PreRegistration.vue')
  const htmlEmail: string = Sqrl.render(PreRegistration, userData, {
    tags: ['{%', '%}'],
  })

  const subject = Sqrl.render(subjectTemplate, userData)

  const options: MailerSendOptions = {
    from: fromAddress,
    to: userData.email,
    subject,
    html: htmlEmail,
  }

  try {
    const emailSent = await mailer.send(options)

    await db
      .update(users)
      .set({ mailSentSuccess: true, mailSentAt: new Date() })
      .where(eq(users.email, userData.email))
  } catch (e) {
    try {
      await db
        .update(users)
        .set({ mailSentSuccess: false })
        .where(eq(users.email, userData.email))
    } catch {
      return {
        status: 500,
        jsonBody: { success: false, error: 'databaseError', kind: 'warn' },
      }
    }

    return {
      status: 500,
      jsonBody: { success: false, error: 'emailError' },
    }
  }

  return { jsonBody: { success: true, message: 'userRegistered' } }
}

app.http('pre-register', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: handleBuapPreRegister,
})
