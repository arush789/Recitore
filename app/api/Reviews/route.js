import Recipe from "@/app/(models)/recipes";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const recipesWithReviews = await Recipe.find().populate("reviews");
    return NextResponse.json({ recipesWithReviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving recipes with reviews:", error },
      { status: 500 }
    );
  }
}
