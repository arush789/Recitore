import UserDataLayout from '@/app/(components)/UserDataLayout'
import { getSaves } from '@/app/api/api'
import options from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

const Saved = async () => {
    const session = await getServerSession(options)
    const savedRecipe = await getSaves(session?.user?.email)
    const recipe = savedRecipe.userData[0].saves
    console.log(recipe)
    return (
        <div>
            <UserDataLayout>
                SavedRecipe
            </UserDataLayout>
        </div>
    )
}

export default Saved