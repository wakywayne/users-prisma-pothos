import { builder } from "../src/builder";
import { Address as prismaAddress, Post as prismaPost } from "@prisma/client";

const Address = builder.objectRef<prismaAddress>("Address");
const Post = builder.objectRef<prismaPost>("Post");

Address.implement({
  fields: (t) => ({
    street: t.exposeString("street"),
    city: t.exposeString("city"),
    state: t.exposeString("state"),
    zip: t.exposeString("zip"),
  }),
});

Post.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    slug: t.exposeString("slug"),
    title: t.exposeString("title"),
    body: t.exposeString("body"),
    authorId: t.exposeID("authorId"),
  }),
});

builder.prismaObject("User", {
  include: {
    address: true,
    posts: true,
  },
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name", { nullable: true }),
    email: t.exposeString("email"),
    posts: t.field({
      type: [Post],
      resolve: (user) => user.posts,
    }),
    address: t.field({
      nullable: true,
      type: Address,
      resolve: (user) => (user.address ? user.address : undefined),
    }),
  }),
});
