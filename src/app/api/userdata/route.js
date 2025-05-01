
import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server"

const prisma = new PrismaClient();

export async function POST(req) {
    const { amount, name } = await req.json();
  
    try {
      const user = await prisma.user.create({
        data: {
          amount: Number(amount),
          name: name,
        },
      });
  
      return NextResponse.json({ msg: "done", user });
    } catch (err) {
      console.error("Error creating user:", err);
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
  }
export async function GET(){
    try {
        const data = await prisma.user.findMany({});
        return NextResponse.json({ data });
      } catch (err) {
        console.error("Error fetching users:", err);
        return NextResponse.json({ msg: "Unable to fetch users" }, { status: 500 });
      }

}