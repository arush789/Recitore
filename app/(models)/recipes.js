import mongoose, { Schema } from "mongoose";
import Review from "./reviews";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const recipeSchema = new Schema(
  {
    user: String,
    userMail: String,
    title: String,
    ingredients: String,
    procedure: String,
    ratings: Number,
    category: String,
    imgURL: String,
    reviews: [Review.schema],
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
