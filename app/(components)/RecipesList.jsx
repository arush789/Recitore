"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'



const RecipesList = (data) => {

    return (
        <div className='flex gap-10 flex-wrap font-bold pb-10'>
            {data?.recipes?.map((item, index) =>
            (
                <Link href={`/RecipeDetail/${item._id}`} className='w-full' key={index}>
                    <div className='bg-nav rounded-3xl flex flex-col  lg:items-start lg:flex-row py-10 lg:py-5 px-5 w-full gap-5' key={index}>
                        <div className='flex justify-center'>
                            <picture>

                                <Image src={item.imgURL} className=' rounded-lg object-cover w-[265px] h-52' width={500} height={500} alt='recipe-image' />

                            </picture>
                        </div>
                        <div className='flex flex-col gap-2 ml-4'>
                            <h1 className='text-nav-text text-2xl'>{item.title}</h1>
                            <p className='text-gray-500'>Added on : {formatDate(item.createdAt)}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

const formatDate = (createdAt) => {
    if (!createdAt) return '';
    const date = new Date(createdAt);
    return date.toLocaleDateString('en-US');
}

export default RecipesList