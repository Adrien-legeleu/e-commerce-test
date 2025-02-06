import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, role, code } = await request.json();
    if (role === "USER") {
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
    }
  } catch (error) {}
}
