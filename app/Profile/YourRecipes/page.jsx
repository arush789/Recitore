
import { Urbanist } from "next/font/google";
import Link from "next/link";
import RecipeCard from "../../(components)/RecipeCards";
import { getServerSession } from "next-auth";
import options from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import RecipesList from "../../(components)/RecipesList";
import { getRecipes } from "@/app/api/api";
import UserDataLayout from "@/app/(components)/UserDataLayout";

const urbanist = Urbanist({ subsets: ["latin"] });

const RecipeCreate = async () => {
    const session = await getServerSession(options)

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/YourRecipes")
    }

    let { recipes } = await getRecipes()
    recipes = recipes.filter((item) => item.userMail == session?.user?.email)

    return (
        <UserDataLayout>
            <div className={`${urbanist.className}  flex flex-col gap-10`}>
                <div >
                    <div className="flex justify-between pr-2 lg:pr-10 ">
                        <h1 className="text-3xl font-bold lg:text-5xl">Your Recipes</h1>
                        <Link className="text-3xl lg:text-5xl" href="/Create">+</Link>
                    </div>
                    <hr className="my-5" />
                    <RecipesList recipes={recipes} />
                </div>
            </div>
        </UserDataLayout>
    )
}

export default RecipeCreate