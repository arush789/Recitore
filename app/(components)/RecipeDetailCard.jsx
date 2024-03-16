
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';

import { Urbanist } from "next/font/google";
import ReviewCard from './ReviewCard';
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';
import Reviews from './Reviews';
import Link from 'next/link';
import { getRecipeById } from '../api/api';
const urbanist = Urbanist({ subsets: ["latin"] });

const RecipeDetailCard = async (recipeId) => {

    const session = await getServerSession(options)
    const recipe = await getRecipeById(recipeId.recipeId)

    const formatTextWithBulletNumbers = (text) => {
        const lines = text.split('\n');
        let lineNumber = 1;
        const formattedText = lines.map((line) => {
            if (line.trim() !== '') {
                return `${lineNumber++}. ${line.trim()}`;
            }
            return line;
        });
        return formattedText.join('\n');
    };

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
                            <div className='flex py-4 font-bold gap-5 flex-col lg:items-start  w-full lg:justify-start lg:gap-2 items-center '>
                                <div className={`${urbanist.className} flex flex-col gap-1 w-full items-center lg:items-start`}>
                                    <h1 className='text-3xl lg:text-4xl'>{recipe.recipe.title}</h1>
                                    <p>Added by {recipe.recipe.user}</p>
                                </div>
                                <div className='flex'>
                                    <p><StarBorderIcon /></p>
                                    <p><StarBorderIcon /></p>
                                    <p><StarBorderIcon /></p>
                                    <p><StarBorderIcon /></p>
                                    <p><StarBorderIcon /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-nav-text flex flex-col gap-5 lg:px-5'>
                        <div className='flex flex-col gap-5'>
                            <h1 className={`${urbanist.className} font-bold text-4xl`}>Ingredients :</h1>
                            <p className='text-xl whitespace-pre-line'>{formatTextWithBulletNumbers(recipe.recipe.ingredients)}</p>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <h1 className={`${urbanist.className} font-bold text-4xl`}>Prodcedure :</h1>
                            <p className='text-xl whitespace-pre-line'>{formatTextWithBulletNumbers(recipe.recipe.procedure)}</p>
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