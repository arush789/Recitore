"use client"
import { Urbanist } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Reviews from "./Reviews";
const urbanist = Urbanist({ subsets: ["latin"] });

const ReviewCard = ({ id, name, email }) => {

    const router = useRouter()
    const recipeId = id

    const startingData = {
        name: `${name}`,
        email: `${email}`,
        review: "",
        rating: 0
    }

    const [reviewFormData, setReviewFormData] = useState(startingData)

    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        const newValue = e.target.type === 'radio' ? parseInt(value) : value;

        setReviewFormData(prev => ({
            ...prev,
            [name]: newValue
        }));
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
            setReviewFormData(startingData)
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} onClick={() => handleChange({ target: { name: 'rating', value: i } })}>
                    {i <= reviewFormData.rating ? <StarIcon className="text-yellow-500" /> : <StarBorderIcon />}
                </span>
            );
        }
        return stars;
    };

    return (
        <>
            <div className={`${urbanist.className} flex h-full w-full py-5 px-5 z-50`}>
                <div className='flex flex-col bg-nav w-[50rem] lg:w-full rounded-3xl py-5 px-5  text-nav-text'>
                    <div className='flex flex-col gap-5'>
                        <h1 className='font-bold text-4xl'>Your Review</h1>
                        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                            <h1 className="text-2xl">Review</h1>
                            <textarea required className='lg:w-[50rem] p-2 border-2 border-nav-text rounded-2xl' name="review" rows={5} placeholder='Type your review here...' onChange={handleChange} />
                            <div className="flex items-center">
                                <span className="text-2xl">Rating :</span>
                                {renderStars()}
                            </div>
                            <button type="submit" className="bg-bgColor rounded-lg p-3 text-nav lg:w-52">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewCard