import { Type, type Static } from '@sinclair/typebox'
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-typebox'
import { DiscriminatedUnionValidator } from 'typebox-validators'
import { EmailRegex } from '../utils/validation-formats'

export const USER_HEARD_FROM_OPTIONS = [
  'FROM_A_FRIEND',
  'INSTAGRAM',
  'FACEBOOK',
  'TIKTOK',
  'CAMPUS_TALK',
  'OTHER',
] as const

export type UserHeardFrom = (typeof USER_HEARD_FROM_OPTIONS)[number]

const userHeardFromEnum = pgEnum('user_heard_from', USER_HEARD_FROM_OPTIONS)

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email').unique().notNull(),
  majorIn: text('major_in').notNull(),
  semester: integer('semester'),
  fromBuap: boolean('from_buap').notNull().default(true),
  schoolOfOrigin: text('school_of_origin'),
  whatToExpect: text('what_to_expect').notNull(),
  firstTimer: boolean('first_timer').notNull().default(true),
  heardFrom: userHeardFromEnum('heard_from').notNull().default('OTHER'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const userSelectSchema = createSelectSchema(users)

export const userCommonInsertSchema = Type.Object({
  firstName: Type.String({
    minLength: 2,
    maxLength: 50,
    errorMessage: 'Debe tener entre 2 y 50 caracteres',
  }),
  lastName: Type.String({
    minLength: 2,
    maxLength: 50,
    errorMessage: 'Debe tener entre 2 y 50 caracteres',
  }),
  email: Type.String({
    pattern: EmailRegex.source,
    errorMessage: 'Debe ser un correo electrónico válido',
  }),
  majorIn: Type.String({
    minLength: 3,
    maxLength: 120,
    errorMessage: 'Debe tener entre 3 y 120 caracteres',
  }),
  semester: Type.Number({
    minimum: 1,
    maximum: 10,
    errorMessage: 'Debe ser un número entre 1 y 10',
  }),
  whatToExpect: Type.String({
    minLength: 10,
    maxLength: 500,
    errorMessage: 'Debe tener entre 10 y 500 caracteres',
  }),
  firstTimer: Type.Boolean(),
  heardFrom: Type.Enum(
    Object.fromEntries(USER_HEARD_FROM_OPTIONS.map((v) => [v, v])),
    { errorMessage: `Debe ser uno de: ${USER_HEARD_FROM_OPTIONS.join(', ')}` }
  ),
})

const userFromBuapInsertSchema = Type.Object({
  fromBuap: Type.Literal(true),
})

const userNotFromBuapInsertSchema = Type.Object({
  fromBuap: Type.Literal(false),
  schoolOfOrigin: Type.String({
    minLength: 2,
    maxLength: 120,
    errorMessage: 'Debe tener entre 2 y 120 caracteres',
  }),
})

export const userInsertSchema = Type.Union(
  [
    Type.Composite([userCommonInsertSchema, userFromBuapInsertSchema], {
      additionalProperties: false,
    }),
    Type.Composite([userCommonInsertSchema, userNotFromBuapInsertSchema], {
      additionalProperties: false,
    }),
  ],
  {
    discriminantKey: 'fromBuap',
  }
)

export type User = Static<typeof userSelectSchema>
export type UserInsert = Static<typeof userInsertSchema>

export const validateUserInsert = new DiscriminatedUnionValidator(
  userInsertSchema
)
