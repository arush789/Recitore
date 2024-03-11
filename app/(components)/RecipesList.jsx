import Link from 'next/link'
import React from 'react'

const RecipesList = (data) => {
    return (
        <div className='flex gap-10 flex-wrap font-bold'>
            {data?.recipes?.map((item, index) => (
                <Link href={`/RecipeDetail/${item._id}`} className='w-full'>
                    <div className='bg-nav rounded-3xl flex flex-col items-center lg:items-start lg:flex-row py-10 lg:py-5 px-5 w-full gap-5' key={index}>
                        <div className='flex justify-center'>
                            <picture>
                                <img src={item.imgURL} className=' rounded-lg object-cover w-[265px] h-52' />
                            </picture>
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1 className='text-nav-text text-2xl'>{item.title}</h1>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RecipesList