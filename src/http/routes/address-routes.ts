import { FastifyInstance } from 'fastify'
import { AddressController } from '../controllers/address-controller'
import { verifyJwt } from '../middlewares/verify-jwt'


export class AddressRoutes {

    static routes = async (app: FastifyInstance) => {
        app.get('/addresses', { onRequest: [verifyJwt] }, AddressController.index)
        app.post('/addresses', { onRequest: [verifyJwt] }, AddressController.create)
    }
}