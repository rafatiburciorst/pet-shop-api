import { FastifyInstance } from 'fastify'
import { PetImageController } from '../controllers/image-controller'

export class PetImageRoutes {

    static routes = async (app: FastifyInstance) => {
        app.get('/pets/images', PetImageController.index)
        app.post('/pets/images/:petId', PetImageController.create)
    }
}