import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'
import { eq } from 'drizzle-orm'
import { createDrizzle } from '../create-drizzle'
import { resend, vueEmail } from '../mailer'
import { UserInsert, users, validateUserInsert } from '../schema'
import { formValidationErrors } from '../utils/form-validation-errors'

import * as Sqrl from 'squirrelly'
import PreRegistration from '../email/compiled/PreRegistration'

const createDB = createDrizzle(process.env['DatabaseConnectionString']!)

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
        error: 'Invalid user data',
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
      jsonBody: { success: false, error: 'User already exists' },
    }
  }

  try {
    await db.insert(users).values(userData)
  } catch {
    return {
      status: 500,
      jsonBody: { success: false, error: 'Database error' },
    }
  }

  // const emailTemplate = await vueEmail.render('PreRegistration.vue')
  const htmlEmail: string = Sqrl.render(
    PreRegistration,
    userData,
    { tags: ['{%', '%}'] }
  )

  const options: Parameters<typeof resend.emails.send>[0] = {
    from: 'onboarding@resend.dev',
    to: 'jolliness_cloud175@simplelogin.com',
    subject: 'This is a test',
    html: htmlEmail,
  }

  const emailSent = await resend.emails.send(options)

  console.log(emailSent)

  return { jsonBody: { success: true, message: 'User registered' } }
}

app.http('hack-buap-pre-register', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: handleBuapPreRegister,
})
