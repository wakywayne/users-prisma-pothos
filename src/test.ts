import { db } from "./prisma-client";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function getUsers() {
  const users = await client.user.findMany();
  return users;
}

console.log(getUsers());
