import { server } from "./server/Server";
import { Knex } from "./server/database/knex";

const startServer = () => {
  server.listen(process.env.PORT || 3333, () => {
    console.log(`API rodando na porta: ${process.env.PORT}`)
  });
};

if (process.env.IS_LOCALHOST !== 'true') {
  Knex.migrate.latest()
    .then(() => {
      startServer();
    })
    .catch(console.log)
} else {
  startServer();
}
