
import { Urbanist } from "next/font/google";
import Link from "next/link";
import RecipesList from "../../(components)/RecipesList";
import { getRecipes } from "@/app/api/api";
import UserDataLayout from "@/app/(components)/UserDataLayout";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const urbanist = Urbanist({ subsets: ["latin"] });

const RecipeCreate = async () => {
    const session = await getServerSession(options)
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