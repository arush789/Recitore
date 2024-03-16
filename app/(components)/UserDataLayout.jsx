import { getServerSession } from "next-auth";
import Link from "next/link";
import options from "../api/auth/[...nextauth]/options";

const UserDataLayout = async ({ children }) => {
    const session = await getServerSession(options)
    return (
        <div className='flex p-5 lg:px-20 lg:py-10 flex-col gap-10'>
            <div className="flex text-center justify-center text-3xl font-bold py-5 w-full lg:text-6xl lg:justify-normal  sm:text-4xl ">
                <h1>
                    Hello , {session?.user?.name}
                </h1>
            </div>
            <div className='flex w-full justify-center lg:justify-between lg:items-center'>
                <h1 className='text-5xl font-bold'>Your Data</h1>
                <Link href="/api/auth/signout?callbackUrl=/" className='text-white hover:font-bold bg-red-500 p-2 rounded-lg hidden lg:block'>Log out</Link>
            </div>
            <div className='flex flex-col gap-5'>
                <div className='flex gap-10 text-2xl justify-center lg:justify-normal'>
                    {/* <Link href="#" className='hover:font-bold'>Recipes</Link> */}
                    <Link href="/Profile/YourRecipes" className='hover:font-bold '>Recipes</Link>
                    <Link href="#" className='hover:font-bold'>Saved</Link>
                    <Link href="/Profile/Reviews" className='hover:font-bold'>Reviews</Link>
                </div>
                <hr />
            </div>
            {children}
            <Link href="/api/auth/signout?callbackUrl=/" className='text-white hover:font-bold bg-red-500 p-2 rounded-lg lg:hidden text-center'>Log out</Link>
        </div>
    );
};

export default UserDataLayout;
