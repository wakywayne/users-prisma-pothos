import { builder } from "../src/builder";
import { db as prismaDb } from "../src/prisma-client";

builder.mutationField("createUser", (t) =>
  t.prismaField({
    type: "User",
    args: {
      name: t.arg.string(),
      email: t.arg.string({ required: true }),
      street: t.arg.string({ required: true }),
      city: t.arg.string({ required: true }),
      state: t.arg.string({ required: true }),
      zip: t.arg.string({ required: true }),
    },
    resolve: async (query, parent, args, ctx) => {
      const address = {
        street: args.street,
        city: args.city,
        state: args.state,
        zip: args.zip,
      };
      const user = await prismaDb.user.create({
        data: {
          name: args.name,
          email: args.email,
          address,
        },
      });
      return user;
    },
  })
);
