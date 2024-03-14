import React from 'react'
import { Urbanist } from "next/font/google";
import { getReviews, getReviewsById } from '../api/api';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
const urbanist = Urbanist({ subsets: ["latin"] });


const Reviews = async ({ recipeId }) => {


    const { reviews } = await getReviewsById(recipeId);
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

    return (
        <>
            <div className={`${urbanist.className} flex h-full w-full py-5 px-5 z-50`}>
                <div className='flex flex-col bg-nav w-[50rem] lg:w-full rounded-3xl py-5 px-5 text-nav-text'>
                    <div className='flex flex-col gap-5 '>
                        <h1 className='font-bold text-4xl'>Reviews</h1>
                        {reviews.map((item, index) => (
                            <div className='flex flex-col border-2 text-nav border-nav-text rounded-lg p-2 gap-5 bg-bgColor' key={index}>
                                <h1 className='text-xl font-bold'>{item.name}</h1>
                                <p className='text-lg'>{item.review}</p>
                                <div className='flex'>
                                    {renderStars(item.rating)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Reviews