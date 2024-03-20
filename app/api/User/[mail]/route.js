import User from "@/app/(models)/user";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { mail } = params;
    const userData = await User.find({ userEmail: mail });
    return NextResponse.json({ userData }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
