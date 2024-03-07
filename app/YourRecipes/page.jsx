
import { Urbanist } from "next/font/google";
import Link from "next/link";
import { getRecipes } from "../api/api";
import RecipeCard from "../(components)/RecipeCard";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import RecipesList from "../(components)/RecipesList";

const urbanist = Urbanist({ subsets: ["latin"] });

const RecipeCreate = async () => {
    const session = await getServerSession(options)

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/YourRecipes")
    }

    let { recipes } = await getRecipes()

    recipes = recipes.filter((item) => item.user == session?.user?.name)


    return (
        <div className={`${urbanist.className}  flex flex-col gap-10`}>
            <div className="flex text-center justify-center text-3xl font-bold py-10 w-full lg:text-6xl lg:justify-normal lg:px-20 lg:py-20 sm:text-4xl ">
                <h1>
                    Hello , {session?.user?.name}
                </h1>
            </div>
            <div className="px-6 lg:px-20">
                <div className="flex justify-between pr-2 lg:pr-10">
                    <h1 className="text-3xl font-bold lg:text-5xl">Your Recipes</h1>
                    <Link className="text-3xl lg:text-5xl" href="/Create">+</Link>
                </div>
                <hr className="my-5" />
                <RecipesList recipes={recipes} />
            </div>
        </div>
    )
}

export default RecipeCreate