"use client"
import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useSession } from 'next-auth/react';
import { removeSaveRecipe, saveRecipe } from '../api/api';
import { useRouter } from 'next/navigation';

const Save = ({ recipeId, saveData }) => {
    const { data: session } = useSession();
    const [isSaved, setIsSaved] = useState(saveData.userData[0].saves.some(item => item.includes(recipeId)));
    const router = useRouter()

    const handleSave = (mail, id) => {
        setIsSaved(!isSaved);
        saveRecipe(mail, id);
    };

    const handlerRemove = (mail, id) => {
        setIsSaved(!isSaved);
        removeSaveRecipe(mail, id);
        router.refresh()
    };

    return (
        <>
            <div className='bg-nav p-2 rounded-lg text-nav-text flex items-center gap-1'>
                {isSaved ? (
                    <>
                        <button onClick={() => handlerRemove(session?.user?.email, recipeId)}>
                            <FavoriteIcon className='text-red-500' /> Saved
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => handleSave(session?.user?.email, recipeId)}>
                            <FavoriteBorderIcon /> Save
                        </button>
                    </>
                )}
            </div>
        </>
    );
};

export default Save;
