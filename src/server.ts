import fastify from "fastify";
import { userRepository } from "./services/userRepository.service";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./db/prisma";
import { User } from "./model/tbuser.model";
import { z } from "zod";
import { cachedDataVersionTag } from "v8";

const PORT = 3030;
const app = fastify();

app.post('/api/users', (request, reply) => {
      let repository = new userRepository(prisma);
      const createLinkSchema = z.object({
            name: z.string(),
            email: z.string(),
            surName: z.string()
      })

      const { name, surName, email } = createLinkSchema.parse(request.body);

      const incomeUser = new User(name, surName, email);

      try {
            const result = repository.insertUser(incomeUser)
            return reply.status(200).send({ message: 'OK', res: result })
      } catch (err) {
            return reply.status(500).send({ message: err })
      }


})

app.get('/api/users', (request, reply) => {
      //implement repository read      
})

app.listen({
      port: PORT,
}).then(() => {
      console.log(`server is listening ${PORT}`)
})
