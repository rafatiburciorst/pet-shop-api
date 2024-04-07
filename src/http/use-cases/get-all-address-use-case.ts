import { db } from "../../lib/prisma";

interface Request {
}

interface Response {
    addresses: {
        id: string,
        city: string
    }[]
}

export class GetAllAddressUseCase {

    async execute(): Promise<Response> {

        const addresses = await db.address.findMany()
        return {
            addresses
        }
    }
}