import { MultipartFile } from "@fastify/multipart";
import { db } from "../../lib/prisma";
import { randomUUID } from "crypto";
import { join } from "path";
import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";

interface Request {
    title: string
    data: MultipartFile
    petId: string
}

interface Response {}

export class CreatePetImageUseCase {

    async execute({ title, data, petId }: Request): Promise<Response> {

        const filename = randomUUID()
        const mime = data.mimetype
        const extension = '.'.concat(mime.split('/')[1])
        const path = join(__dirname, '..', '..', '..', 'store', filename + extension)

        await pipeline(
            data.file,
            createWriteStream(path)
        )

        // /Users/rafaeltiburcio/dev/courses/ignite-project/pet-shop-api/store/75ebddb0-eb81-433d-b9ed-5f681ec34375.jpeg
        const url = `store/${filename + extension}`
        await db.image.create({
            data: {
                petId,
                title,
                url
            }
        })

        return {}
    }
}