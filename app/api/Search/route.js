import Recipe from "@/app/(models)/recipes";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const fullUrl = req.url;
    const queryString = new URL(fullUrl, "http://localhost:3000").search;
    const queryParams = new URLSearchParams(queryString);
    const query = queryParams.get("query");
    const regex = new RegExp(query, "i");
    const recipes = await Recipe.find({ title: regex });
    if (!query || query.trim() === "") {
      return NextResponse.json({ recipes: [] }, { status: 200 });
    }
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
