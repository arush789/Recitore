import Link from 'next/link'

import { Dancing_Script } from "next/font/google";
import { getServerSession } from 'next-auth';
import options from '../api/auth/[...nextauth]/options';
const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Nav = async () => {
  const session = await getServerSession(options)
  return (
    <header className="bg-nav">
      <nav className="flex justify-between items-center w-full h-16 px-2 py-10 text-nav-text">
        <Link href="/" className={`${dancingScript.className} font-bold text-5xl`}>Recitore</Link>
        <div className="flex gap-10  text-base lg:px-10 md:px-2 sm:px-1">
          <Link href="/RecipePage/1">Recipes</Link>
          <Link href="/RecipeCreate">Create</Link>
          {session ?
            <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
            :
            <Link href="/api/auth/signin">Login</Link>
          }
        </div>
      </nav>
    </header>
  )
}

export default Nav