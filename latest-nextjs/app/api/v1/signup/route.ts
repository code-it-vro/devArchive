import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    await prismaClient.user.create({
      data: {
        name: data.name,
        password: data.password
      },
    });

    console.log("Received data:", data);

    return NextResponse.json({
      message: "you have been signed up",
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
