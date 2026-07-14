import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { users } from 'src/db/schema';
import { eq } from 'drizzle-orm';
import type { NewUser } from 'src/db/schema';

@Injectable()
export class UsersService {

    async findByEmail(email: string){
        return db.query.users.findFirst({
            where: eq(users.email, email)
        })
    }

    async findById(id: string) {
        return db.query.users.findFirst({
            where: eq(users.id, id)
        })
    }

    async create(newUser: NewUser) {
        return await db.insert(users).values(newUser).returning();
    }
    
    async update(id: string, updatedFiels  :Partial<NewUser>) {
        return await db.update(users).set({...updatedFiels, updatedAt: new Date()}).where(eq(users.id, id)).returning();
    }

    async findAll() {
        return await db.query.users.findMany();
    }

    async delete(id: string)  {
        return await db.delete(users).where(eq(users.id, id)).returning();
    }
}
