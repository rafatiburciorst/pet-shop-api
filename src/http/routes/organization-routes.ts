import { FastifyInstance } from 'fastify'
import { OrganizationController } from '../controllers/organizations-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

export class OrganizationRoutes {

    static routes = async (app: FastifyInstance) => {
        app.get('/organizations', OrganizationController.index)
        app.get('/organizations/me', {onRequest: [verifyJwt]}, OrganizationController.me)
        app.post('/organizations', OrganizationController.create)
    }
}