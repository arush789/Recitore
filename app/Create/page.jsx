import RecipeForm from '@/app/(components)/RecipeForm'
import { getServerSession } from 'next-auth'
import options from '../api/auth/[...nextauth]/options'

const Create = () => {

    return (
        <div><RecipeForm /></div>
    )
}

export default Create