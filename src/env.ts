import { z } from 'zod'
import 'dotenv/config'


const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
    throw new Error(JSON.stringify(_env.error.format, null, 2))
}

const env = _env.data

export {
    env
}