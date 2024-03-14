
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RecipeCard = async (data) => {
    return (
        <div className='flex justify-center gap-10 flex-wrap'>
            {data?.recipes?.map((item, index) => (
                <Link href={`/RecipeDetail/${item._id}`} key={index} className='hover:scale-110 transition duration-80 ease-out'>
                    <div className='bg-nav rounded-3xl flex flex-col py-5 px-5 w-[20rem] gap-5' key={index}>
                        <div className='flex justify-center'>
                            <picture>

                                <Image src={item.imgURL} className=' rounded-lg object-cover w-[265px] h-52' width={400} height={400} alt='recipe-image' />

                            </picture>
                        </div>
                        <div className='flex flex-col justify-center gap-2'>
                            <h1 className='text-nav-text text-2xl font-bold'>{item.title}</h1>
                            <p className='text-gray-500 font-bold'>Added by {item.user}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RecipeCard