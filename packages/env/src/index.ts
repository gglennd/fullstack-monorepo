import { z} from "zod"

export const env = z.object({
  PORT: z.coerce.number()
})