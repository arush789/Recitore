import Recipe from "../../(models)/recipes";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const recipeData = body.formData;
    Recipe.create(recipeData);
    return NextResponse.json({ message: "Successful" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const recipes = await Recipe.find();
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
