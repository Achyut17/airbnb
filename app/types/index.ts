import {User} from '@prisma/client'

export type safeUser = Omit<
    User,
    "createdAT" | "updatedAt" | "emailVerified"
> & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}