import { FastifyRequest, FastifyReply } from 'fastify'
import { coerce, z } from 'zod'
import { CreatePetImageUseCase } from '../use-cases/create-pet-image-use-case'
import { GetAllImagesUseCase } from '../use-cases/get-all-images-use-case'


const imageTitle = z.object({
    title: z.object({
        value: z.string().optional()
    })
})

const imageParam = z.object({
    petId: z.string().cuid()
})

const querySchema = z.object({
    page: coerce.number().optional().default(1),
    perPage: coerce.number().optional().default(10)
})

export class PetImageController {

    static index = async (request: FastifyRequest, reply: FastifyReply) => {
        const getAllImagesUseCase = new GetAllImagesUseCase()
        const { page, perPage } = querySchema.parse(request.query)
        const data = await getAllImagesUseCase.execute({ page, perPage })
        return reply.status(200).send(data)
    }

    static create = async (request: FastifyRequest, reply: FastifyReply) => {
        const validParam = imageParam.safeParse(request.params)
        if (!validParam.success) return reply.status(400).send(validParam.error.formErrors.fieldErrors)

        const data = await request.file()
        if (!data) return reply.status(400).send({ message: 'no file found' })

        const validTitle = imageTitle.safeParse(data.fields)
        if (!validTitle.success) return reply.status(400).send(validTitle.error.formErrors.fieldErrors)

        const createPetImageUseCase = new CreatePetImageUseCase()
        const title = validTitle.data.title.value!
        const petId = validParam.data.petId

        await createPetImageUseCase.execute({ title, data, petId })

        return reply.status(201).send()
    }
}