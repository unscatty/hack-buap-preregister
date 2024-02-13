import { Type, type Static } from '@sinclair/typebox'
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-typebox'
import { StandardValidator } from 'typebox-validators'
import { EmailRegex } from '../utils/validation-formats'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  faculty: text('faculty'),
  semester: integer('semester'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const userSelectSchema = createSelectSchema(users)

export const userInsertSchema = Type.Object(
  {
    email: Type.String({
      pattern: EmailRegex.source,
      errorMessage: 'Debe ser un correo electrónico válido',
    }),
    name: Type.String({
      minLength: 3,
      maxLength: 80,
      errorMessage: 'Debe tener entre 3 y 80 caracteres',
    }),
    semester: Type.Optional(
      Type.Number({
        minimum: 1,
        maximum: 20,
        errorMessage: 'Debe ser un número entre 1 y 20',
      })
    ),
    faculty: Type.Optional(
      Type.String({
        minLength: 3,
        maxLength: 120,
        errorMessage: 'Debe tener entre 3 y 120 caracteres',
      })
    ),
  },
  { additionalProperties: false }
)

export type User = Static<typeof userSelectSchema>
export type UserInsert = Static<typeof userInsertSchema>

export const validateUserInsert = new StandardValidator(userInsertSchema)
