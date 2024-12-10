import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createUser() {
  // Create a user
  await client.user.create({
    data: {
      username: "ashutosh123",
      password: "password123",
      age: 30,
    },
  });
  console.log("User created successfully");

  // Fetch all users from the table
  const users = await client.user.findMany(); // Queries the entire 'user' table
  console.log("Users in the table:", users);
}

createUser();
