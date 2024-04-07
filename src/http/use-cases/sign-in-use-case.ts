import { db } from "../../lib/prisma"

interface Request {
    email: string
    password: string
}

interface Response {
    id: string
    name: string
}

export class SignInUseCase {

    async execure({ email, password }: Request): Promise<Response | null> {
        const user = await db.organization.findFirst({
            where: {
                email: email,
                password: password
            }
        })

        if (!user) return null

        return {
            id: user.id,
            name: user.name
        }
    }
}