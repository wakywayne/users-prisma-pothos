const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { buildSubgraphSchema } = require("@apollo/subgraph");
import { schema } from "../schema";

async function startApolloServer() {
  const server = new ApolloServer({
    schema,
  });

  const port = 4001;
  const subgraphName = "user-subgraph";

  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port },
    });

    console.log(`🚀 Subgraph ${subgraphName} running at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
