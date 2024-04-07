import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreateAddressUseCase } from '../use-cases/create-address-use-case'
import { GetAllAddressUseCase } from '../use-cases/get-all-address-use-case'

const addressSchema = z.object({
    city: z.string()
})


export class AddressController {

    static index = async (request: FastifyRequest, reply: FastifyReply) => {
        const getAllAddressUseCase = new GetAllAddressUseCase()
        const addresses = await getAllAddressUseCase.execute()
        return reply.status(200).send({
            data: addresses
        })
    }

    static create = async (request: FastifyRequest, reply: FastifyReply) => {
        const isValid = addressSchema.safeParse(request.body)
        if (!isValid.success) return reply.status(400).send(isValid.error.formErrors.fieldErrors)

        const createAddressUseCase = new CreateAddressUseCase()
        const { city } = isValid.data
        await createAddressUseCase.execute({ city })

        return reply.status(200).send()
    }
}