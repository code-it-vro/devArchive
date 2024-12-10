## Bootstrapping a TypeScript + Prisma Project

### **Step-by-Step Setup**

1. **Folder Setup**:
   - Create a new folder for your project.

2. **Install Dependencies**:
   - Run the following command to install necessary dependencies as **devDependencies**:
     ```bash
     npm install typescript prisma ts-node @types/node --save-dev
     ```

3. **Initialize TypeScript**:
   - Run `npx tsc --init` to generate a `tsconfig.json` file.
   - Update the following settings in `tsconfig.json`:
     ```json
     {
       "rootDir": "./src",
       "outDir": "./dist"
     }
     ```

4. **Initialize Prisma**:
   - Run `npx prisma init`.
   - This creates:
     - A `prisma` folder containing a `schema.prisma` file.
     - A `.env` file with the placeholder `DATABASE_URL` environment variable.

5. **Update `.env`**:
   - Modify `DATABASE_URL` in `.env` to match your PostgreSQL connection details:

     Replace `<username>`, `<password>`, and `<database_name>` with your PostgreSQL credentials.
     ```env
     DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<database_name>"
     ```

6. **Edit `schema.prisma`**:
   - Replace the content of `schema.prisma` with the following:
     ```prisma
     generator client {
       provider = "prisma-client-js"
     }

     datasource db {
       provider = "postgresql"
       url      = env("DATABASE_URL")
     }

     model User {
       id       Int     @id @default(autoincrement())
       username String  @unique
       password String
       age      Int
     }
     ```

7. **Run Prisma Migrate**:
   - Execute the command:
     ```bash
     npx prisma migrate dev
     ```
   - **Prompt Encountered**:
     Prisma will ask:
     ```
     Drift detected: Your database schema is not in sync with your migration history.

     [+] Added tables
       - User

     Do you want to continue? All data will be lost. » (y/N)
     ```
     - Select **`y`** to confirm the reset of the database schema.
     - Provide a migration name (e.g., `init_user_model`).

8. **Generate Changes**:
   - Prisma will create a migration file in the `prisma/migrations` folder.
   - Apply the migration to your PostgreSQL database, adding the `User` table with the following structure:
     ```sql
     CREATE TABLE "User" (
       "id" SERIAL PRIMARY KEY,
       "username" VARCHAR NOT NULL UNIQUE,
       "password" VARCHAR NOT NULL,
       "age" INT NOT NULL
     );
     ```

9. **Run `npx prisma generate`**:
   - This command generates a **type-safe Prisma Client** based on the `schema.prisma` file.
   - The client is stored in `node_modules/.prisma/client` and allows you to interact with your database using JavaScript or TypeScript.
   - Example usage:
     ```typescript
     import { PrismaClient } from "@prisma/client";

     const prisma = new PrismaClient();

     async function main() {
       const user = await prisma.user.create({
         data: {
           username: "JohnDoe",
           password: "securepassword",
           age: 30,
         },
       });
       console.log(user);
     }

     main();
     ```
   - Run `npx prisma generate` whenever you update the `schema.prisma` file to keep the client in sync.

### **Important Notes**

- **Ensure the `DATABASE_URL` is Correct**:
  Verify that the `DATABASE_URL` in your `.env` file matches your database credentials.

- **Future Steps**:
  After migrations, you can use the Prisma client in your TypeScript code to interact with the `User` table. Always run:
  ```bash
  npx prisma generate
