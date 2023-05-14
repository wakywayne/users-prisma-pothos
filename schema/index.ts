import "./users";
import "./queries";
import "./mutations";
import { builder } from "../src/builder";
import { printSubgraphSchema } from "@apollo/subgraph";
import { writeFile } from "fs";

export const schema = builder.toSchema({});
let printedSchema = printSubgraphSchema(schema);

writeFile("./schema.graphql", printedSchema, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});
