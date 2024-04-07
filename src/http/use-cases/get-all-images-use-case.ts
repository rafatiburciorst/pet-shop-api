import { db } from "../../lib/prisma";
import { paginate, ResponsePagination } from '../../util/pagination'

interface Request {
    page: number
    perPage: number
}

interface Response {
    data: {
        title: string,
        url: string
    }[],
    meta: ResponsePagination
}

export class GetAllImagesUseCase {

    async execute({ page, perPage }: Request): Promise<Response> {
        
        const images = await db.image.findMany({
            skip: (page - 1) * perPage,
            take: perPage,
        })

        const totalResults = await db.image.count()
        const baseUrl = 'http://localhost:3000/'

        const data = images.map((item) => {
            return {
                title: item.title,
                url: baseUrl + item.url
            }
        })


        const meta = paginate({ page, perPage, totalResults })

        return {
            data,
            meta
        }
    }
}