import fastify from "fastify";
import { userRepository } from "./services/userRepository.service";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./db/prisma";
import { User } from "./model/tbuser.model";
import { z } from "zod";
import { cachedDataVersionTag } from "v8";
import { Roles } from "./model/roles";
import { result } from "./result/result.model";

const PORT = 3030;
const app = fastify();



app.register(require('@fastify/swagger'))

app.register(require('@fastify/swagger-ui'), {
      routePrefix: '/documentation',
      uiConfig: {
            docExpansion: 'full',
            deepLinking: false
      },
      uiHooks: {
            onRequest: function (request: any, reply: any, next: any) : void {
                  next()
            },
      }
})

app.post('/api/settings/users', async (request, reply) => {
      let repository = new userRepository(prisma);
      const createLinkSchema = z.object({
            name: z.string(),
            email: z.string(),
            surName: z.string()
      })

      const { name, surName, email } = createLinkSchema.parse(request.body);

      const incomeUser = new User(name, surName, email, Roles.ADMIN);

      try {
            const result = await repository.insertUser(incomeUser)
            return reply.status(200).send({ message: 'OK', res: result })
      } catch (err) {
            return reply.status(500).send({ message: err })
      }

})
app.get('/', (request, reply) => {
  const r = new result().fail(["this gone wrong"]);
  reply.send(r);    
})
app.get('/api/users', (request, reply) => {
      //implement repository read      
})

//Summary
//register a new application to the system. The user needs to be the administrator or contributor
//in order to do that.
app.get('/api/v1/users', async (request, reply) => {
 const repository = new userRepository(prisma);

 const db = await repository.get();

 console.log(db);

 return db;
})
app.listen({
      port: PORT,
}).then(() => {
      console.log(`server is listening ${PORT}`)
})
