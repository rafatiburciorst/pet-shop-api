import { db } from "../../lib/prisma";
import { paginate, ResponsePagination } from "../../util/pagination";

interface Request {
    page: number
    perPage: number
    city: string
}

interface Response {
    pets: {
        id: string
        name: string
        city: string
        cor: string
        age: number
        images: {
            id: string
            url: string
        }[]
    }[],
    meta: ResponsePagination
}

export class GetPetByCityUseCase {

    async execute({ page, perPage, city }: Request): Promise<Response> {

        const upperFirstCase = city.charAt(0).toUpperCase() + city.slice(1)
        const data = await db.pet.findMany({
            skip: (page -1) * perPage,
            take: perPage,
            where: {
                city: {
                    contains: upperFirstCase
                }
            },
            include: {
                image: {
                    select: {
                        id: true,
                        url: true
                    }
                }
            },
        })

        const totalResults = await db.pet.count()

        const pets = data.map((item) => {
            const images = item.image.map((img) => {
                return {
                    id: img.id,
                    url: 'http://localhost:3000/'.concat(img.url)
                }
            })
            return {
                id: item.id,
                name: item.name,
                city: item.city,
                cor: item.cor,
                age: item.age,
                images
            }
        })

        const meta = paginate({ page, perPage, totalResults })

        return {
            pets,
            meta
        }
    }
}