import RecipeCard from "./(components)/RecipeCard";
import "./page.css"

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });
import { getRecipes } from "./api/api";


const Home = async () => {
  const { recipes } = await getRecipes()
  return (
    <div className={`relative ${urbanist.className}`}>
      <div className="w-full overflow-hidden h-full lg:h-96 sm:h-60">
        <div className='flex flex-col gap-5 h-56 items-center justify-center w-full absolute z-40 lg:w-9/12 lg:h-60 lg:translate-y-24 lg:translate-x-20 lg:justify-normal lg:items-baseline md:justify-center sm:justify-center sm:h-60 sm:items-center sm:flex-col sm:w-full'>
          <h1 className={`${urbanist.className} text-4xl lg:text-7xl font-semibold sm:text-4xl`}>Search any recipe</h1>
          <input type="text" name="serach" id="search" placeholder="Search..." className='rounded-full p-3 w-70 lg:w-96 sm:96 bg-search-bar border-2 border-search-bar-border' />
        </div>
        <video autoPlay loop muted className='video filter brightness-75'>
          <source src="videos/homeVideo2.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="py-20 flex flex-col gap-10">
        <h1 className={` text-center text-5xl font-bold`}>Most Viewed</h1>
        <div className="flex flex-col lg:h-96 items-center lg:justify-center lg:flex-row lg:gap-44 font-bold">
          <RecipeCard recipes={recipes} />
        </div>
      </div>
      <div className="flex absolute w-full bg-cover bg-center h-[calc(100vh-220px)] lg:h-[calc(100vh-400px)]" style={{ backgroundImage: "url('/images/homeImg.jpg')", filter: "brightness(85%)" }} />
      <div className=" flex z-50 justify-center px-10 pt-10 pb-5 w-full lg:-translate-x-28 text-right lg:text-center items-center h-[calc(100vh-220px)] lg:h-[calc(100vh-400px)] lg:justify-end" style={{ zIndex: "50" }}>
        <p className="text-3xl lg:w-[55%] font-bold leading-normal lg:leading-[5rem] lg:text-[3vw] text-bgColor relative" >
          Discover mouthwatering dishes, step-by-step guides, and kitchen inspiration on our Recitore where every bite tells a story!
        </p>
      </div>
      <div className={` hidden gap-10 py-20 px-10 font-bold lg:flex `}>
        <div className="text-center text-nav-text bg-nav w-72 h-[calc(100vh-300px)] rounded-3xl p-5 ">
          <h1 className="text-4xl">Filter</h1>
        </div>
        <div className="p-5 flex flex-col gap-10">
          <h1 className="text-4xl">Recipes</h1>
          <RecipeCard recipes={recipes} />
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
