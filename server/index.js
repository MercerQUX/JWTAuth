import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./graphql/schema.js";
import { rootGraphQL } from "./graphql/root.js";
const app = express();
const PORT = 4000;

app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    rootValue: rootGraphQL,
    schema,
  })
);

app.listen(PORT, () => {
  try {
    console.log(`Starting server in port: ${PORT}`);
  } catch (e) {
    console.log(e);
  }
});
