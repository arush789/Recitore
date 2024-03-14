
import UserReviews from '@/app/(components)/UserReviews'
import { getReviews } from '@/app/api/api'
import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'

const ReviewsPage = async () => {
    const session = await getServerSession(options)

    let reviewsData = await getReviews()
    const userEmail = session?.user?.email;

    const userReviews = reviewsData.recipesWithReviews.map(recipe => {
        const filteredReviews = recipe.reviews.filter(review => review.email === userEmail);
        return { recipeName: recipe.title, reviews: filteredReviews, recipeId: recipe._id };
    });


    return (
        <div className='flex p-5 lg:px-20 lg:py-10 flex-col gap-10'>
            <div className='flex w-full justify-center lg:justify-between lg:items-center'>
                <h1 className='text-5xl font-bold'>Your Data</h1>
                <Link href="/api/auth/signout?callbackUrl=/" className='text-white hover:font-bold bg-red-500 p-2 rounded-lg'>Log out</Link>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex gap-10 text-2xl justify-center lg:justify-normal'>
                    {/* <Link href="#" className='hover:font-bold'>Recipes</Link> */}
                    <Link href="#" className='hover:font-bold'>Saved</Link>
                    <Link href="/Profile/Reviews" className='hover:font-bold'>Reviews</Link>
                </div>
                <hr />
                <UserReviews reviews={userReviews} />
            </div>
        </div>
    )
}

export default ReviewsPage