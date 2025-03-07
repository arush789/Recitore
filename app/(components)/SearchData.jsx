"use client"
import { Urbanist } from "next/font/google";
import { getRecipesBySearch } from "../api/api";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
const urbanist = Urbanist({ subsets: ["latin"] });



const SearchData = () => {
    const [searchData, setSearchData] = useState()
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const delaySearch = setTimeout(async () => {
            if (searchTerm) {
                const recipe = await getRecipesBySearch(searchTerm);
                setSearchData(recipe);
            }
        }, 300);

        return () => clearTimeout(delaySearch);
    }, [searchTerm]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    console.log(searchTerm)

    return (
        <>
            <div className="absolute z-30 h-[25rem] sm:h-60 items-center lg:items-start lg:h-96 w-[100%] flex flex-col justify-center gap-3 lg:gap-5 lg:translate-x-10 lg:w-[80%]">
                <h1 className={`${urbanist.className} text-[2.5rem] lg:text-7xl font-semibold sm:text-4xl`}>Search any recipe</h1>
                <input type="text" name="search" id="search" placeholder="Search..." className=' z-50 rounded-full p-3 w-70 lg:w-96 sm:96 bg-search-bar border-2 border-search-bar-border' onChange={handleSearch} />
                {searchData?.recipes?.length > 0 ?
                    <div className="absolute bg-nav h-72 z-40 w-[80%] lg:w-[70%] top-[16rem] sm:top-[10rem] md:top-[10rem] lg:top-[16rem] rounded-lg overflow-auto py-8 px-2 border-2 border-black">
                        <div className="flex flex-col gap-5">
                            {searchData.recipes.map((item, index) => (
                                <Link href={`/RecipeDetail/${item._id}`} key={index}>
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