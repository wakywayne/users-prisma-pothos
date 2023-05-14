// import { DateTimeResolver } from "graphql-scalars";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import PrismaUtilsPlugin from "@pothos/plugin-prisma-utils";
import ScopeAuthPlugin from "@pothos/plugin-scope-auth";
import ErrorsPlugin from "@pothos/plugin-errors";
import type PrismaTypes from "../prisma/pothos-types";
import { db as client } from "./prisma-client";

export const builder = new SchemaBuilder<{
  // DefaultInputFieldRequiredness: true;
  PrismaTypes: PrismaTypes;
  Scalars: {
    /*DateTime: {
      Output: Date;
      Input: Date;
    };*/
  };
}>({
  plugins: [ErrorsPlugin, ScopeAuthPlugin, PrismaPlugin, PrismaUtilsPlugin],
  // defaultInputFieldRequiredness: true,
  errorOptions: {
    defaultTypes: [],
  },
  authScopes: () => ({}),
  prisma: {
    client,
    exposeDescriptions: true,
    filterConnectionTotalCount: true,
  },
});

builder.objectType(Error, {
  name: "Error",
  fields: (t) => ({
    message: t.exposeString("message"),
  }),
});

builder.queryType();
builder.mutationType();

// builder.addScalarType("DateTime", DateTimeResolver, {});
