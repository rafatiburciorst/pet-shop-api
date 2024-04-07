import { db } from "../../lib/prisma";
import { Pet } from "../controllers/pet-controller";

interface Request {
    pet: Pet
}

interface Response {}

export class CreatePetUseCase {

    async execute({ pet }: Request): Promise<Response> {

        await db.pet.create({
            data: {
                ...pet
            }
        })
        return {}
    }
}