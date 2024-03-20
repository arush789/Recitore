import Recipe from "@/app/(models)/recipes";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const id = params.id;
    const averageRatings = params.ratings;
    await Recipe.findOneAndUpdate({ _id: id }, { likes: averageRatings });
    return NextResponse.json({ message: "Successful" }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
