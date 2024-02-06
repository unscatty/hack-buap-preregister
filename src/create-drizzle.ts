import postgres from 'postgres'
import * as schema from './schema/index.js'

export type Schema = typeof schema

export const createDrizzle = async (...config: Parameters<typeof postgres>) => {
  const { drizzle } = await import('drizzle-orm/postgres-js')

  const client = postgres(...config)

  const db = drizzle(client, { schema })

  return db
}
