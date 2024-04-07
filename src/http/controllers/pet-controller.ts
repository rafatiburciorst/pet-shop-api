import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreatePetUseCase } from '../use-cases/create-pet-use-case'
import { GetAllPetUseCase } from '../use-cases/get-all-pets-use-case'
import { GetPetByCityUseCase } from '../use-cases/get-pets-by-city-use-case'

const petSchema = z.object({
    name: z.string(),
    city: z.string(),
    cor: z.string(),
    age: z.coerce.number(),
    organizationId: z.string(),
    typeId: z.string(),
})

const petSchemaQuery = z.object({
    page: z.coerce.number().default(1),
    perPage: z.coerce.number().default(10)
})

const petSchemaParam = z.object({
    city: z.string()
})

export type Pet = z.infer<typeof petSchema>

export class PetController {

    static index = async (request: FastifyRequest, reply: FastifyReply) => {
        const getAllPetUseCase = new GetAllPetUseCase()
        const { page, perPage } = petSchemaQuery.parse(request.query)
        const data = await getAllPetUseCase.execute({ page, perPage })
        return reply.status(200).send({ data })
    }

    static create = async (request: FastifyRequest, reply: FastifyReply) => {
        const valid = petSchema.safeParse(request.body)
        if (!valid.success) return reply.status(400).send(valid.error.formErrors.fieldErrors)

        const createPetUseCase = new CreatePetUseCase()
        const pet = valid.data

        createPetUseCase.execute({ pet })
        return reply.status(201).send()
    }

    static getPetByCity = async (request: FastifyRequest, reply: FastifyReply) => {
        const isValid = petSchemaParam.safeParse(request.params)
        if (!isValid.success) return reply.status(400).send(isValid.error.formErrors.fieldErrors)
        const { page, perPage } = petSchemaQuery.parse(request.query)
        const { city } = isValid.data

        const getPetByCityUseCase = new GetPetByCityUseCase()
        const data = await getPetByCityUseCase.execute({ page, perPage, city })

        return reply.status(200).send(data)
    }
}