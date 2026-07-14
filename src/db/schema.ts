import {pgTable, text, timestamp, uuid, pgEnum, boolean} from 'drizzle-orm/pg-core'

export const userRole = pgEnum('user_role', ['USER', 'ADMIN'])

export const users = pgTable('users', {
    // data and role 
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: userRole('role').notNull().default('USER'),

    // email verification & password reset
    isVerified: boolean('is_verified').notNull().default(false),
    verificationToken: text('verification_token'),
    verificationTokenExpiresAt: timestamp('verification_token_expires_at', { withTimezone: true }),

    // refresh token
    resetToken: text('reset_token'),
    resetTokenExpiresAt: timestamp('reset_token_expires_at', { withTimezone: true }),
    refreshtoken: text('refresh_token_hash'),

    // timestamps
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
}) 



export const taskStatusEnum = pgEnum('task_status', ['PENDING', 'IN_PROGRESS', 'COMPLETED'])

export const tasks = pgTable('tasks', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description'),
    status: taskStatusEnum('status').notNull().default('PENDING'),
    userId: uuid('user_id').notNull().references(() => users.id),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
})



export type User =  typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;