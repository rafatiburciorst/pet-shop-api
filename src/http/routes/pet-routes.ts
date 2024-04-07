import { FastifyInstance } from 'fastify'
import { PetController } from '../controllers/pet-controller'
import { verifyJwt } from '../middlewares/verify-jwt'

export class PetRoutes {

    static routes = async (app: FastifyInstance) => {
        app.get('/pets', { onRequest: [verifyJwt] }, PetController.index)
        app.get('/pets/:city', { onRequest: [verifyJwt] }, PetController.getPetByCity)
        app.post('/pets', { onRequest: [verifyJwt] }, PetController.create)
    }
}