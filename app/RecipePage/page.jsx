import RecipeCard from "../(components)/RecipeCards"
import { getRecipes } from "../api/api"

const RecipePage = async () => {
  const recipes = await getRecipes()
  return (
    <div className="py-10 hidden lg:flex">
      <div className="flex flex-col bg-nav h-[50rem] w-[350px] py-5 rounded-3xl ml-10 text-nav-text gap-5">
        <div>
          <h1 className="text-nav-text font-bold text-4xl text-center">Filter</h1>
        </div>
        <hr className="bg-nav-text h-[5px] mx-10 rounded-lg" />
      </div>
      <div className="flex flex-col items-end w-[80%]">
        <div className=" flex flex-col gap-10">
          <h1 className="text-5xl font-bold lg:pl-20 ">Recipes</h1>
          <RecipeCard recipes={recipes.recipes} />
        </div>
      </div>
    </div>
  )
}

export default RecipePage