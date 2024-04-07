import { MultipartFile } from "@fastify/multipart";
import { db } from "../../lib/prisma";
import { randomUUID } from "crypto";
import { join } from "path";
import { pipeline } from "stream/promises";
import { createWriteStream, existsSync, mkdirSync } from "fs";

interface Request {
    title: string
    data: MultipartFile
    petId: string
}

interface Response { }

export class CreatePetImageUseCase {

    async execute({ title, data, petId }: Request): Promise<Response> {

        const filename = randomUUID()
        const mime = data.mimetype
        const extension = '.'.concat(mime.split('/')[1])
        const folder = join(__dirname, '..', '..', '..', 'store')

        if (!existsSync(folder)) {
            mkdirSync(folder)
        }
        
        const path = join(folder, filename + extension)

        await pipeline(
            data.file,
            createWriteStream(path)
        )

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