"use client"
import { Urbanist } from "next/font/google";
const urbanist = Urbanist({ subsets: ["latin"] });

const ReviewCard = (id) => {
    return (
        <>
            <div className={`${urbanist.className} flex h-full w-full py-5 px-5 z-50`}>
                <div className='flex flex-col bg-nav w-[50rem] lg:w-full rounded-3xl py-5 px-5  text-nav-text'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='font-bold text-4xl'>Your Review</h1>
                        <form className="flex flex-col gap-5 ">
                            <textarea className='lg:w-[50rem] p-2 border-2 border-nav-text rounded-2xl' name="comment" rows={5} placeholder='Type your review here...' />
                            <button type="submit" className="bg-bgColor rounded-lg p-3 text-nav lg:w-52">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewCard