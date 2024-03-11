import RecipeCard from "./(components)/RecipeCard";
import "./page.css"

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });

import { getRecipes } from "./api/api";
import SearchData from "./(components)/SearchData";
import Link from "next/link";


const Home = async () => {
  const { recipes } = await getRecipes()
  const limitedRecipes = recipes.filter((item, index) => index < 4);


  return (
    <div className={`relative ${urbanist.className}`}>
      <div className="w-full overflow-hidden h-[25rem] lg:h-96 sm:h-60 relative">
        <SearchData />
        <video autoPlay loop muted className='video filter brightness-75 absolute top-0 left-0 w-full h-full object-cover'>
          <source src="videos/homeVideo2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="py-20 flex flex-col gap-10 ">
        <h1 className={` text-center text-4xl font-bold lg:text-5xl`}>Most Viewed</h1>
        <div className="flex flex-col items-center lg:justify-center lg:flex-row lg:gap-44 font-bold">
          <RecipeCard recipes={limitedRecipes} />
        </div>
      </div>
      <div className="flex absolute w-full bg-cover bg-center h-[calc(100vh-220px)] lg:h-[calc(100vh-400px)]" style={{ backgroundImage: "url('/images/homeImg.jpg')", filter: "brightness(85%)" }} />
      <div className=" flex z-50 justify-center px-10 pt-10 pb-5 w-full lg:-translate-x-28 text-right lg:text-center items-center h-[calc(100vh-220px)] lg:h-[calc(100vh-400px)] lg:justify-end" style={{ zIndex: "50" }}>
        <p className="text-3xl lg:w-[55%] font-bold leading-normal lg:leading-[5rem] lg:text-[3vw] text-bgColor relative" >
          Discover mouthwatering dishes, step-by-step guides, and kitchen inspiration on our Recitore where every bite tells a story!
        </p>
      </div>
      <div className={` hidden gap-10 py-20 px-10 font-bold lg:flex lg:flex-col lg:items-center w-full`}>
        <div className="flex w-[80%]">
          {/* <div className="text-center text-nav-text bg-nav w-72 h-[calc(100vh-300px)] rounded-3xl p-5 ">
            <h1 className="text-4xl">Filter</h1>
          </div> */}
          <div className="p-5 flex flex-col gap-10 items-center">
            <h1 className="text-4xl">Recipes</h1>
            <RecipeCard recipes={recipes} />
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/RecipePage" className="flex bg-nav text-nav-text p-2 rounded-lg hover:scale-110 transition duration-80 ease-out">View More</Link>
        </div>
      </div>
      <div className="lg:hidden flex w-full flex-col">
        <div className="flex p-10 text-4xl font-bold justify-between w-full">
          <h1>Recipes</h1>
          <button className="bg-nav px-5 py-2 rounded-2xl text-nav-text text-2xl">Filter</button>
        </div>
        <div>
          <RecipeCard recipes={recipes} />
        </div>
      </div>

    </div >
  );
}

export default Home;
