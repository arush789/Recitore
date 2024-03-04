import "./page.css"

import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });


const Home = () => {

  return (
    <div className='relative'>
      <div className="w-full overflow-hidden h-full lg:h-96 sm:h-60">
        <div className='flex flex-col gap-5 h-56 items-center justify-center w-full absolute z-40 lg:w-9/12 lg:h-60 lg:translate-y-24 lg:translate-x-20 lg:justify-normal lg:items-baseline md:justify-center sm:justify-center sm:h-60 sm:items-center sm:flex-col sm:w-full'>
          <h1 className={`${urbanist.className} text-4xl lg:text-7xl font-semibold sm:text-4xl`}>Search any recipe</h1>
          <input type="text" name="serach" id="search" placeholder="Search..." className='rounded-full p-3 w-70 lg:w-96 sm:96 bg-search-bar border-2 border-search-bar-border' />
        </div>
        <video autoPlay loop muted className='video filter brightness-75'>
          <source src="videos/homeVideo2.mp4" type="video/mp4" />
        </video>
      </div>
    </div >
  );
}

export default Home;
