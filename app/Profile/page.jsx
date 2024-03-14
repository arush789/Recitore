import Link from 'next/link'
import React from 'react'

const Profile = () => {
    return (
        <div className='flex p-5 lg:px-20 lg:py-10 flex-col gap-10'>
            <div className='flex w-full justify-center lg:justify-normal'>
                <h1 className='text-5xl font-bold'>Your Data</h1>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex gap-10 text-2xl justify-center lg:justify-normal'>
                    {/* <Link href="#" className='hover:font-bold'>Recipes</Link> */}
                    <Link href="#" className='hover:font-bold'>Saved</Link>
                    <Link href="/Profile/Reviews" className='hover:font-bold'>Reviews</Link>
                </div>
                <hr />
            </div>
            <Link href="/api/auth/signout?callbackUrl=/" className='text-red-600 hover:font-bold'>Log out</Link>
        </div>
    )
}

export default Profile