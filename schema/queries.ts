import { builder } from "../src/builder";
import { db as prismaDb } from "../src/prisma-client";

// builder.queryField("users", (t) =>
//   t.prismaField({
//   })
// );

builder.queryFields((t) => ({
  user: t.prismaField({
    errors: {
      types: [Error],
    },
    type: ["User"],
    resolve: async (query, root, args, ctx) => {
      /*let c = false;
      if (c) {
        throw new Error("C is Alive RUNNNNNN!");
      }*/
      const users = prismaDb.user.findMany({ ...query });
      return users;
    },
  }),
}));
