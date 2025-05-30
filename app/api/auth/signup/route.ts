import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextResponse ,NextRequest} from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    // Get data from request body
    const { username, email, password } = await req.json();
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { username }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" }, 
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" ,error}
    );
  }
}