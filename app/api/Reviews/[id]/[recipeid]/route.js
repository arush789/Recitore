import Recipe from "@/app/(models)/recipes";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const reviewId = params.id;
    const recipeId = params.recipeid;

    const result = await Recipe.findOneAndUpdate(
      { _id: recipeId },
      { $pull: { reviews: { _id: reviewId } } },
      { new: true }
    );

    return NextResponse.json({ message: "Review deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting review:", error },
      { status: 500 }
    );
  }
}
