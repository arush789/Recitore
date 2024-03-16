import RecipeDetailCard from '@/app/(components)/RecipeDetailCard'

import React from 'react'

const RecipeDetail = ({ params }) => {
    return (
        <div>
            <RecipeDetailCard recipeId={params.id} />
        </div>
    )
}

export default RecipeDetail