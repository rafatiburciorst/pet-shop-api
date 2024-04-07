import { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/auth-controller'

export class AuthRoutes {

    static routes = async (app: FastifyInstance) => {
        app.post('/sign-in', AuthController.signIn)
    }
}