"use client"
import { Urbanist } from "next/font/google";
import { getRecipesBySearch } from "../api/api";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
const urbanist = Urbanist({ subsets: ["latin"] });



const SearchData = () => {
    const [searchData, setSearchData] = useState()

    const handleSearch = async (e) => {
        const recipe = await getRecipesBySearch(e.target.value)
        setSearchData(recipe)
    }

    console.log(searchData)

    return (
        <>
            <div className="absolute z-30 h-[13rem] items-center lg:items-start lg:h-96 w-[100%] flex flex-col justify-center gap-5 lg:translate-x-5 lg:w-[80%]">
                <h1 className={`${urbanist.className} text-4xl lg:text-7xl font-semibold sm:text-4xl`}>Search any recipe</h1>
                <input type="text" name="search" id="search" placeholder="Search..." className=' z-50 rounded-full p-3 w-70 lg:w-96 sm:96 bg-search-bar border-2 border-search-bar-border' onChange={handleSearch} />
                {searchData?.recipes?.length > 0 ?
                    <div className="absolute bg-nav h-72 z-40 w-[80%] lg:w-[70%] top-[10rem] lg:top-[15rem] rounded-lg overflow-auto py-8 px-2 border-2 border-black">
                        <div className="flex flex-col gap-5">
                            {searchData.recipes.map((item) => (
                                <Link href={`/RecipeDetail/${item._id}`}>
                                    <div className="flex flex-col lg:flex-row gap-2 items-center lg:items-start" key={item.id}>
                                        <picture>
                                            <Image src={item.imgURL} className="w-52 rounded-lg h-[150px] object-cover" alt={item.title} width={300} height={300} />
                                        </picture>
                                        <h1 className="text-nav-text text-2xl font-bold">{item.title}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div >
                    : <></>
                }
            </div >
        </>
    )
}

export default SearchData