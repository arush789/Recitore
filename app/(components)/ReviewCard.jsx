"use client"
import { Urbanist } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
const urbanist = Urbanist({ subsets: ["latin"] });

const ReviewCard = ({ id, name }) => {

    const router = useRouter()
    const recipeId = id

    const startingData = {
        name: `${name}`,
        review: "",
        ratings: 0
    }

    const [reviewFormData, setReviewFormData] = useState(startingData)

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setReviewFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/Reviews/${recipeId}`, {
                method: "POST",
                body: JSON.stringify({ reviewFormData }),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) {
                throw new Error("Failed to add review ");
            }

            router.refresh();
            router.push(`/RecipeDetail/${recipeId}`);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <>
            <div className={`${urbanist.className} flex h-full w-full py-5 px-5 z-50`}>
                <div className='flex flex-col bg-nav w-[50rem] lg:w-full rounded-3xl py-5 px-5  text-nav-text'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='font-bold text-4xl'>Your Review</h1>
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <textarea required className='lg:w-[50rem] p-2 border-2 border-nav-text rounded-2xl' name="review" rows={5} placeholder='Type your review here...' onChange={handleChange} />
                            <button type="submit" className="bg-bgColor rounded-lg p-3 text-nav lg:w-52">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewCard