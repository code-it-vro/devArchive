

# **Latest Next.js Full-Stack Application**

This project demonstrates how to bootstrap a bare minimum full-stack application in Next.js using **Prisma**, **TypeScript**, and **PostgreSQL**. Below is a step-by-step guide to setting up the application.

---

## **1. Bootstrapping the Project**
1. Run the following command to create a new Next.js application:
   ```bash
   npx create-next-app@latest
   ```
2. During setup, choose the following options:
   - **TypeScript**: Yes
   - **ESLint**: Yes
   - **App Router**: Yes
   - **Tailwind CSS**: Yes
   - **Experimental Features**: No

3. Navigate to the newly created project folder:
   ```bash
   cd latest-nextjs
   ```

---

## **2. Setting Up the Backend**

### **API Route**
The backend logic is defined in the `api/v1/signup/route.ts` file. This route handles user sign-ups by saving data to a PostgreSQL database.

### **File: `app/api/v1/signup/route.ts`**
```typescript
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Save user data to the database
    await prismaClient.user.create({
      data: {
        name: data.username,
        password: data.password,
      },
    });

    console.log("Received data:", data);

    return NextResponse.json({
      message: "You have been signed up",
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
```

---

## **3. Setting Up the Database**
1. **Install Prisma**:
   ```bash
   npm install prisma --save-dev
   npm install @prisma/client
   ```

2. **Initialize Prisma**:
   ```bash
   npx prisma init
   ```

3. **Prisma Schema**:
   Update your `prisma/schema.prisma` file to define the `User` model:
   ```prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   model User {
     id       Int    @id @default(autoincrement())
     name     String
     password String
   }
   ```

4. **Run Migrations**:
   ```bash
   npx prisma migrate dev --name init
   ```

---

## **4. Setting Up the Frontend**

### **Sign-Up Page**
The frontend for user sign-up is located in `signup/page.tsx`. It uses `axios` to send a `POST` request to the backend.

### **File: `signup/page.tsx`**
```tsx
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={async () => {
            await axios.post("/api/v1/signup", { username, password });
            router.push("/signin");
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
```

---

## **5. Running the Application**
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the application in your browser at `http://localhost:3000`.

---

