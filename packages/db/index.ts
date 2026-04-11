import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Create the connection pool using your Supabase string
const pool = new Pool({ connectionString: process.env.DATABASE_URL })

// Wrap it in the Prisma Adapter
const adapter = new PrismaPg(pool)

// Pass the adapter to the client
export const prisma = new PrismaClient({ adapter })