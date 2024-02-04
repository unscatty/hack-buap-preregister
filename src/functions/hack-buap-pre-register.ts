import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'
import { createDrizzle } from '../create-drizzle'
import { UserInsert, users } from '../schema'
import { eq } from 'drizzle-orm'

const createDB = createDrizzle(process.env['DatabaseConnectionString']!)

// TODO: validate incoming data using TypeBox/Zod
// TODO: success/error message builder
export async function handleBuapPreRegister(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const db = await createDB

  const userData = (await request.json()) as unknown as UserInsert

  console.log(userData)

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

  return { jsonBody: { success: true, message: 'User registered' } }
}

app.http('hack-buap-pre-register', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: handleBuapPreRegister,
})
