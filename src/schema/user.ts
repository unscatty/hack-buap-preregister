import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique().notNull(),
  name: text('name').notNull(),
  faculty: text('faculty'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type User = InferSelectModel<typeof users>
export type UserInsert = Omit<
  InferInsertModel<typeof users>,
  'id' | 'createdAt' | 'updatedAt'
>
