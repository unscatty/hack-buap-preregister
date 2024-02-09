import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'
import { createDrizzle } from '../create-drizzle'
import { UserInsert, users } from '../schema'
import { eq } from 'drizzle-orm'
import { resend, vueEmail } from '../mailer'

const createDB = () => createDrizzle(process.env['DatabaseConnectionString']!)

// TODO: validate incoming data using TypeBox/Zod
// TODO: success/error message builder
// TODO: check for success on email sending
export async function handleBuapPreRegister(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const db = await createDB()

  const userData = (await request.json()) as unknown as UserInsert

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

  const emailTemplate = await vueEmail.render('PreRegistration.vue')

  const options: Parameters<typeof resend.emails.send>[0] = {
    from: 'hackathon.buap@resend.dev',
    to: 'jolliness_cloud175@simplelogin.com',
    subject: 'Pre-registro Lobo Hackathon BUAP 2024',
    html: emailTemplate.html,
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
