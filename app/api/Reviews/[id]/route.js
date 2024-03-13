import Recipe from "@/app/(models)/recipes";
import Review from "@/app/(models)/reviews";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const reviewData = body.reviewFormData;
    const recipe = await Recipe.findOne({ _id: id });

    if (!recipe) {
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    }
    const reviewModel = new Review(reviewData);
    recipe.reviews.push(reviewModel);
    await recipe.save();

    return NextResponse.json({ message: "Review Added" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding review:", error },
      { status: 500 }
    );
  }
}
