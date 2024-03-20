import UserDataLayout from '@/app/(components)/UserDataLayout'
import { getRecipeById, getSaves } from '@/app/api/api'
import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Image from 'next/image'

import { Urbanist } from "next/font/google";
import Link from 'next/link'
const urbanist = Urbanist({ subsets: ["latin"] });

const Saved = async () => {
    const session = await getServerSession(options)
    const savedRecipe = await getSaves(session?.user?.email)
    const recipe = savedRecipe.userData[0].saves
    const savedRecipesData = []

    for (const id of savedRecipe.userData[0].saves) {
        const recipeData = await getRecipeById(id)
        if (recipeData && recipeData.recipe !== null) {
            savedRecipesData.push(recipeData)
        }
    }

    return (
        <div>
            <UserDataLayout>
                <div className='flex flex-wrap gap-5 justify-center'>
                    {savedRecipesData.map((recipe, i) => (
                        <Link key={i} href={`/RecipeDetail/${recipe?.recipe?._id} `}>
                            <div className='bg-nav text-nav-text rounded-xl p-5 flex flex-col gap-4 hover:scale-110 transition duration-80 ease-out'>
                                <picture>
                                    <Image src={recipe?.recipe?.imgURL} className='rounded-xl object-cover w-[265px] h-52' width={500} height={500} alt='recipe-image' />
                                </picture>
                                <h1 className={`${urbanist.className} text-3xl font-bold`}>{recipe?.recipe?.title}</h1>
                                <p className='font-bold text-gray-500'>Added by {recipe?.recipe?.user}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </UserDataLayout>
        </div>
    )
}

export default Saved