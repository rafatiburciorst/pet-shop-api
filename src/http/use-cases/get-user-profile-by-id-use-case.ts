import { db } from "../../lib/prisma"

interface Request {
    userId: string
}

interface Response {
    organization: {
        id: string
        name: string
        email: string
    }
}

export class GetUserProfileByUserIdUseCase {

    async execure({ userId }: Request): Promise<Response | null> {
        const organization = await db.organization.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true
            }
        })

        if (!organization) throw new Error('Organization not found')

        return {
            organization
        }
    }
}