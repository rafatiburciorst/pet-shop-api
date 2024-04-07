import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CreateOrganizationUseCase } from '../use-cases/create-organization-use-case'
import { GetAllOrganizationUseCase } from '../use-cases/get-all-organization-use-case'
import { GetUserProfileByUserIdUseCase } from '../use-cases/get-user-profile-by-id-use-case'


const organizationSchema = z.object({
    name: z.string(),
    email: z.string(),
    addressId: z.string(),
    password: z.string()
})

export class OrganizationController {

    static index = async (request: FastifyRequest, reply: FastifyReply) => {
        const getAllOrganizationUseCase = new GetAllOrganizationUseCase()
        const data = await getAllOrganizationUseCase.execute()
        return reply.status(200).send({ data })
    }

    static create = async (request: FastifyRequest, reply: FastifyReply) => {
        const isValid = organizationSchema.safeParse(request.body)
        if (!isValid.success) return reply.status(400).send(isValid.error.formErrors.fieldErrors)

        const organization = isValid.data
        const createOrganizationUseCase = new CreateOrganizationUseCase()
        await createOrganizationUseCase.execute({ ...organization })
        return reply.status(201).send()
    }

    static me = async (request: FastifyRequest, reply: FastifyReply) => {
        const userId = request.user.sub

        const getUserProfileByIdUseCase = new GetUserProfileByUserIdUseCase()
        const user = await getUserProfileByIdUseCase.execure({ userId })

        return reply.status(200).send(user)
    }
}