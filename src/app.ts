import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import fastifyJwt from "@fastify/jwt";
import { PetRoutes } from "./http/routes/pet-routes";
import { PetImageRoutes } from "./http/routes/image-routes";
import { OrganizationRoutes } from "./http/routes/organization-routes";
import { AddressRoutes } from "./http/routes/address-routes";
import { join } from "node:path";
import { env } from "./env";
import { AuthRoutes } from "./http/routes/auth-routes";
const app = fastify()

app.register(fastifyCors)
app.register(fastifyMultipart, {
    limits: {
        fileSize: Infinity
    }
})


app.register(fastifyJwt, {
    secret: env.SECRET,
})



app.register(fastifyStatic, {
    root: join(__dirname, '..', 'store'),
    prefix: '/store'
})

app.register(AuthRoutes.routes)
app.register(PetRoutes.routes)
app.register(PetImageRoutes.routes)
app.register(OrganizationRoutes.routes)
app.register(AddressRoutes.routes)

export {
    app
}