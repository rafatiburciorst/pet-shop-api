import { db } from "../../lib/prisma";

interface Request {
    city: string
}

interface Response {}

export class CreateAddressUseCase {

    async execute({ city }: Request): Promise<Response> {

        await db.address.create({
            data: {
                city
            }
        })
        return {}
    }
}