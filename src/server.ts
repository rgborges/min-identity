import fastify from "fastify";

const PORT = 3030;
const app = fastify();

app.get('/', (request, reply) => {
      return 'Hello world'
})

app.listen({
      port: PORT,
}).then(() => {
      console.log(`server is listening ${PORT}`)
})
