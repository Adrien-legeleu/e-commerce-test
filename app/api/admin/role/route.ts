import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { userId, role, code } = await request.json();

    const codeRequired = process.env.REQUIRED_CODE;
    if (!codeRequired) {
      return NextResponse.json(
        { error: "Le code admin n'est pas configué" },
        { status: 500 }
      );
    }
    if (code !== codeRequired) {
      return NextResponse.json({ error: "Code incorrect" }, { status: 401 });
    }
    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { role: role === "USER" ? "ADMIN" : "USER" },
    });
    return NextResponse.json(
      { success: "Role mis a jour", user: updateUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
