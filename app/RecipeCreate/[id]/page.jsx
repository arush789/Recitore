"use client";
import { useSession } from "next-auth/react"
import options from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });

const RecipeCreate = () => {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect("/api/auth/signin?callbackUrl=/RecipeCreate/new")
        }
    })
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
                    <button className="text-3xl lg:text-5xl">+</button>
                </div>
                <hr className="my-5" />
                <p className="font-bold text-2xl lg:text-3xl">No Recipes added yet :/</p>
            </div>
        </div>
    )
}

export default RecipeCreate