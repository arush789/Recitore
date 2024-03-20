import User from "@/app/(models)/user";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const mail = params.mail;
    const recipeId = params.recipeid;
    await User.findOneAndUpdate(
      { userEmail: mail },
      { $addToSet: { saves: recipeId } }
    );
    return NextResponse.json({ message: `"Successful"` }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const mail = params.mail;
    const recipeId = params.recipeid;
    await User.findOneAndUpdate(
      { userEmail: mail },
      { $pull: { saves: recipeId } }
    );
    return NextResponse.json({ message: `"Successful"` }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
