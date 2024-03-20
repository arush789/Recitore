import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';

import { Urbanist } from "next/font/google";
import ReviewCard from './ReviewCard';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';
import Reviews from './Reviews';
import Link from 'next/link';
import { getRecipeById, getSaves } from '../api/api';

import Save from './Save';
const urbanist = Urbanist({ subsets: ["latin"] });

const RecipeDetailCard = async (recipeId) => {

    const session = await getServerSession(options)
    const recipe = await getRecipeById(recipeId.recipeId)
    const ratings = recipe.recipe.reviews.map((item) => (item.rating))
    const averageRating = Math.round(ratings.reduce((sum, a) => sum + a, 0) / ratings.length)
    const saves = await getSaves(session?.user?.email)
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<StarIcon key={i} className='text-yellow-500' />);
            } else {
                stars.push(<StarBorderIcon key={i} />);
            }
        }
        return stars;
    };



    const ingredients = recipe.recipe.ingredients.split("\n").filter(Boolean)
    const procedure = recipe.recipe.procedure.split("\n").filter(Boolean)

    const userName = session?.user?.name
    const userMail = session?.user?.email


    return (
        <>
            <div className={`flex justify-center h-full w-full py-5 px-5 z-50`}>
                <div className='flex flex-col bg-nav w-[50rem] lg:w-full rounded-3xl py-5  px-3 gap-5'>
                    <div className='flex flex-col gap-5 bg-bgColor rounded-3xl lg:items-start lg:flex-row text-nav  lg:px-5 py-4'>
                        <div className=' w-full flex flex-col sm:flex-row lg:flex-row gap-5 lg:h-64'>
                            <div className='w-[20rem] lg:w-[30rem] flex justify-center lg:justify-normal'>
                                <picture>
                                    <Image src={recipe.recipe.imgURL} className='rounded-xl object-cover w-[18rem]  lg:w-[40rem] h-full ' width={400} height={400} alt='recipe-image' />
                                </picture>
                            </div>
                            <div className='flex py-4 font-bold gap-5 flex-col  w-full lg:justify-start lg:gap-2 items-center  lg:items-start sm:items-start '>
                                <div className={`${urbanist.className} flex flex-col gap-1 w-full items-center lg:items-start md:items-start sm:items-start`}>
                                    <h1 className='text-3xl lg:text-4xl'>{recipe.recipe.title}</h1>
                                    <p>Added by {recipe.recipe.user}</p>
                                </div>
                                <div className='flex gap-5 items-center '>
                                    <div className='flex gap-2'>
                                        <div className='flex'>
                                            {renderStars(averageRating)}
                                        </div>
                                        <div>
                                            <p className='text-xl'>{averageRating} / 5 </p>
                                        </div>
                                    </div>
                                </div>
                                <Save recipeId={recipe.recipe._id} saveData={saves} />
                            </div>
                        </div>
                    </div>
                    <div className='text-nav-text flex flex-col gap-5 lg:px-5'>
                        <div className='flex flex-col gap-5'>
                            <h1 className={`${urbanist.className} font-bold text-4xl`}>Ingredients :</h1>
                            <ul className='list-decimal text-xl pl-10'>
                                {ingredients?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <h1 className={`${urbanist.className} font-bold text-4xl`}>Prodcedure :</h1>
                            <ul className='list-decimal text-xl pl-10'>
                                {procedure.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {!session ?
                <div className='relative flex flex-col items-center'>
                    <div className='absolute top-52 z-50 flex flex-col justify-center text-center gap-5'>
                        <h1 className='text-3xl' >Login to see reviews</h1>
                        <Link href="/api/auth/signin" className='bg-bgColor py-2 rounded-lg text-xl'>Login</Link>
                    </div>
                    <div className='w-full filter blur-md brightness-50 z-20 pointer-events-none'>
                        <div>
                            <ReviewCard id={recipe.recipe._id} name={userName} email={userMail} />
                            <Reviews recipeId={recipe.recipe._id} />
                        </div>
                    </div>
                </div>

                :
                <>
                    <ReviewCard id={recipe.recipe._id} name={userName} email={userMail} />
                    <Reviews recipeId={recipe.recipe._id} />
                </>
            }
        </>
    )
}

export default RecipeDetailCard