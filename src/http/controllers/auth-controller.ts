import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { SignInUseCase } from '../use-cases/sign-in-use-case'

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export class AuthController {

    static signIn = async (request: FastifyRequest, reply: FastifyReply) => {
        const isValid = signInSchema.safeParse(request.body)
        if (!isValid.success) return reply.status(400).send(isValid.error.formErrors.fieldErrors)

        const { email, password } = isValid.data
        const signInUseCase = new SignInUseCase()
        const user = await signInUseCase.execure({ email, password })

        if (!user) return reply.status(403).send({
            message: 'Invalid email or password'
        })


        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        return reply.status(200).send({ token })
    }
}