import fastify from "fastify";
import { UserRespository } from "./repositories/userRepository";
import { PrismaClient, RootUsers } from "@prisma/client";
import { prisma } from "./db/prisma";
import { User } from "./model/user.model";
import { string, z } from "zod";
import { cachedDataVersionTag } from "v8";
import { Roles } from "./model/roles";
import { createResult } from "./result/result.model";
import { createSession } from "./model/session.model";
import { Settings } from "http2";
import { encodeSession } from "./services/token.service";
import { OrganizationRepository } from "./repositories/organizationRepository";
import { Guid } from "guid-typescript";

const PORT = 3030;
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const app = fastify({
      logger: true
});



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
/*
Create admin users to manage the identity server.
*/
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
app.get('/api/v1/admin/users', async (request, reply) => {
      const repository = new UserRespository(prisma);

      const db = await repository.get();

      console.log(db);

      return db;
})
//organization registration 
app.post('/api/v1/admin/organizations', async (request, reply) => {
      //1- receive the token via headers and validate


      const createOrganizationSchme = z.object({
            domainName: z.string(),
            ownerId: z.string()
      })
      const organizationRepository = new OrganizationRepository(prisma);
      const userRepository = new UserRespository(prisma);

      const { domainName, ownerId } = createOrganizationSchme.parse(request.body);


      const userSearchResult = await userRepository.getById(ownerId);
      const user = userSearchResult as RootUsers;
      if (user === undefined) {
            console.log("Error finding the root user");
            reply.status(404).send({ message: "User not found" });
      }


      console.log(user);


      const organizationJustCreated = await organizationRepository.insert({
            id: Guid.createEmpty().toString(), 
            domainName: domainName,
            ownerId: user.id
      });


      //create an organization
      //.... use the migrate
      reply.code(200).send({ user: user, organization: organizationJustCreated });
})
app.get('/api/v1/admin/organizations', (request, reply) => {
      const organizationRepository = new OrganizationRepository(prisma);

      const organizations =  organizationRepository.getAll();


      if (organizations === undefined) {
            reply.status(404).send({message: "Not found"})
      }


      return reply.status(200).send(organizations);
})
/*
Create user directories based in an organization.
*/
app.post('/api/v1/admin/directories', (request, reply) => {

})
app.get('/api/v1/secret', (request, reply) => {
      console.log(process.env.TOKEN_SECRET)
      return process.env.TOKEN_SECRET;
})
app.post('/api/v1/auth', async (request, reply) => {
      //check if the user exists on database
      const repository = new UserRespository(prisma);
      const search = await repository.get();
      const createLinkSchema = z.object({
            email: z.string()
      })

      const { email } = createLinkSchema.parse(request.body);
      for (let user of search) {
            let typedUser = user as User;

            if (typedUser.email == email) {
                  const tokenSecret = new String(process.env.TOKEN_SECRET);
                  const session = new createSession()
                        .create(tokenSecret, typedUser.email);

                  const token = encodeSession(tokenSecret.toString(), session);

                  return reply.send(new createResult().ok({
                        data: {
                              email: typedUser.email,
                              authenticated: true,
                              session: token
                        }
                  }))
            }
      }

      return reply.status(404).send(new createResult().fail({
            error: ['username or password is not correct. faild to authenticate']
      }))
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

app.listen({
      port: PORT,
}).then(() => {
      console.log(`server is listening ${PORT}`)
})
