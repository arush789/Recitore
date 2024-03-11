import React from 'react'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const RecipeDetailCard = (data) => {
    const formatTextWithBulletNumbers = (text) => {
        // Split the text by line breaks
        const lines = text.split('\n');
        let lineNumber = 1;
        // Add bullet numbers to each line and prepend them before the text
        const formattedText = lines.map((line) => {
            // Check if the trimmed line is not empty
            if (line.trim() !== '') {
                return `${lineNumber++}. ${line.trim()}`;
            }
            // If the trimmed line is empty, return it as is
            return line;
        });
        // Join the lines back together with line breaks
        return formattedText.join('\n');
    };
    return (
        <>
            <div className='flex justify-center h-full w-full py-5 px-5 z-50 '>
                <div className='flex flex-col bg-nav w-[50rem] lg:w-full rounded-3xl py-5  px-3 gap-5'>
                    <div className='flex flex-col gap-5 bg-bgColor rounded-3xl lg:items-start lg:flex-row text-nav  lg:px-5 py-4'>
                        <div className=' w-full flex flex-col sm:flex-row lg:flex-row gap-5 lg:h-64'>
                            <div className='w-[20rem] lg:w-[30rem] flex justify-center lg:justify-normal'>
                                <picture>
                                    <img src={data.recipe.imgURL} className='rounded-xl object-cover w-[18rem]  lg:w-[40rem] h-full ' />
                                </picture>
                            </div>
                            <div className='flex py-4 font-bold gap-5 flex-col lg:items-start  w-full lg:justify-start lg:gap-2 items-center '>
                                <div className='flex flex-col gap-1 w-full items-center lg:items-start'>
                                    <h1 className='text-3xl lg:text-4xl'>{data.recipe.title}</h1>
                                    <p>Added by {data.recipe.user}</p>
                                </div>
                                <div className='flex'>
                                    <p><StarIcon className='text-yellow-600' /></p>
                                    <p><StarIcon className='text-yellow-600' /></p>
                                    <p><StarIcon className='text-yellow-600' /></p>
                                    <p><StarBorderIcon /></p>
                                    <p><StarBorderIcon /></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='text-nav-text flex flex-col gap-5 lg:px-5'>
                        <div className='flex flex-col gap-5'>
                            <h1 className='font-bold text-3xl'>Ingredients :</h1>
                            <p className='text-xl whitespace-pre-line'>{formatTextWithBulletNumbers(data.recipe.ingredients)}</p>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <h1 className='font-bold text-3xl'>Prodcedure :</h1>
                            <p className='text-xl whitespace-pre-line'>{formatTextWithBulletNumbers(data.recipe.procedure)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeDetailCard