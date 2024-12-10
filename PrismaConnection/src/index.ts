import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createUser() {
  await client.user.create({
    data: {
      username: "ashutosh123456",
      password: "password123",
      age: 30,
    },
  });
  console.log("User created successfully");
}

createUser();

