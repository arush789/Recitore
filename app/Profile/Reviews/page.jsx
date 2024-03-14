
import UserDataLayout from '@/app/(components)/UserDataLayout'
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
        <UserDataLayout>
            <UserReviews reviews={userReviews} />
        </UserDataLayout>
    )
}

export default ReviewsPage