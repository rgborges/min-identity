import fastify from "fastify";
import { UserRespository } from "./services/userRepository.service";
import { PrismaClient } from "@prisma/client";
import { prisma } from "./db/prisma";
import { User } from "./model/tbuser.model";
import { z } from "zod";
import { cachedDataVersionTag } from "v8";
import { Roles } from "./model/roles";
import { createResult } from "./result/result.model";

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
            onRequest: function (request: any, reply: any, next: any): void {
                  next()
            },
            preHandler: function (request: any, reply: any, next: any) {
                  next();
            }
      },
      staticCSP: true,
})

app.post('/api/v1/admin/users', {
      schema: {

      }
}, async (request, reply) => {
      let repository = new UserRespository(prisma);
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


app.post('/api/v1/login', async (request, reply) => {
      //check if the user exists on database
      const repository = new UserRespository(prisma);
      const search = await repository.get();
      const createLinkSchema = z.object({
            email: z.string()
      })

      const { email } = createLinkSchema.parse(request.body);
      for (let user of search) {
            let tUSer = user as User;

            if (tUSer.email == email) {
                 return reply.send(new createResult().ok({
                  data: {
                        authenticated: true,
                        email: tUSer.email
                  }
                 }))
            }
      }
    
      return reply.status(404).send(new createResult().fail({
            error: ['Faild to authenticate']
      }))


})


//organization registration 
 app.post('/api/v1/organizations', async (request, reply) => {
   const repository = new UserRespository(prisma);
   
   //check the user requesting
   let userCheckSchema = z.object({
      userId: z.string()
   });

   const {userId} = userCheckSchema.parse(request.body);

   if (userId === undefined)
   {
      //return an error
      return;
   }
   const owner = await repository.getById(userId) as User;

   if (owner === undefined){
      return;
   }

   //create an organization
   //.... use the migrate
   reply.send({message: 'ok' })
}) 

app.get('/test/error', (request, reply) => {
      const result = new createResult().fail({
            error: ['validation error sample 1', 'validation error sample 2']
      })

      reply.send(result);
})
app.get('/api/users', (request, reply) => {
      //implement repository read      
})

//Summary
//register a new application to the system. The user needs to be the administrator or contributor
//in order to do that.
app.get('/api/v1/users', async (request, reply) => {
      const repository = new UserRespository(prisma);

      const db = await repository.get();

      console.log(db);

      return db;
})
app.listen({
      port: PORT,
}).then(() => {
      console.log(`server is listening ${PORT}`)
})
