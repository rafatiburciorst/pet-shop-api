import { db } from "../../lib/prisma";

interface Request {
}

interface Response {
    organizations: {
        id: string,
        name: string,
        address: {
            id: string,
            city: string
        }
    }[]
}

export class GetAllOrganizationUseCase {

    async execute(): Promise<Response> {

        const organizations = await db.organization.findMany({
            select: {
                id: true,
                name: true,
                address: {
                    select: {
                        id: true,
                        city: true
                    }
                }
            }
        })
        
        return {
            organizations
        }
    }
}