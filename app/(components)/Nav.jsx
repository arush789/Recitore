"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { Dancing_Script } from "next/font/google";
import { useSession } from 'next-auth/react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Image from 'next/image'
import "./Nav.css"

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Nav = () => {
  const { data: session } = useSession({
    required: false
  })

  const [menuClass, setMenuClass] = useState("mob-header-menu");


  function handleMenuToggle() {
    setMenuClass(prevClass => prevClass === "mob-header-menu" ? "mob-header-menu active-menu" : "mob-header-menu")
  }

  return (
    <header>
      <div className="pc-header">
        <Link href="/" className={`brand-name ${dancingScript.className} font-bold text-5xl`}>Recitore</Link>
        <div className='links flex items-center gap-5 text-nav-text'>
          <ul>
            <li><Link href="/RecipePage" className='hover:font-bold'>Recipes</Link></li>
            <li><Link href="/YourRecipes" className='hover:font-bold'>Your Recipes</Link></li>
          </ul>
          {session ?
            <Link href="/Profile">
              <Image src={session?.user?.image} width={40} height={20} className='rounded-full border-2 border-black' alt='user-image' />
            </Link>
            :
            <Link href="/api/auth/signin"><AccountCircleIcon /></Link>
          }
        </div>
      </div>
      <div className="mob-header">
        <Link href="/" className={`brand-name ${dancingScript.className} font-bold text-5xl`}>Recitore</Link>
        <div className='flex gap-5 items-center text-nav-text'>
          <svg onClick={handleMenuToggle} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-list text-black" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>

          {session ?
            <Link href="/Profile">
              <Image src={session?.user?.image} width={40} height={20} className='rounded-full border-2 border-black' alt='user-image' />
            </Link>
            :
            <Link href="/api/auth/signin"><AccountCircleIcon /></Link>
          }
        </div>
      </div>
      <div className={menuClass}>
        <ul>
          <li><Link onClick={() => setMenuClass("mob-header-menu")} href="/RecipePage">Recipes</Link></li>
          <li><Link onClick={() => setMenuClass("mob-header-menu")} href="/YourRecipes">Your Recipes</Link></li>
        </ul>
      </div>
    </header>
  )
}

export default Nav;
