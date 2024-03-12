import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const recipeSchema = new Schema(
  {
    user: String,
    userMail: String,
    title: String,
    ingredients: String,
    procedure: String,
    likes: Number,
    category: String,
    imgURL: String,
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);

export default Recipe;
