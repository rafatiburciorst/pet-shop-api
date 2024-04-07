import { db } from "../../lib/prisma";

interface Request {
    name: string,
    email: string,
    addressId: string,
    password: string,
}

interface Response {}

export class CreateOrganizationUseCase {

    async execute({ name, addressId, email, password }: Request): Promise<Response> {

        await db.organization.create({
            data: {
                name,
                email,
                addressId,
                password
            }
        })
        return {}
    }
}