import RecipeDetailCard from '@/app/(components)/RecipeDetailCard'
import { getRecipeById } from '@/app/api/api'
import React from 'react'

const RecipeDetail = async ({ params }) => {
    const recipe = await getRecipeById(params.id)

    return (
        <div><RecipeDetailCard recipe={recipe.recipe} /></div>
    )
}

export default RecipeDetail