"use client"
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Urbanist } from "next/font/google";
import { redirect } from 'next/navigation';
import Loading from '@/app/(components)/Loading';

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LoginLoading from '@/app/(components)/LoginLoading';

const urbanist = Urbanist({ subsets: ["latin"] });

const LoginPage = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (session) {
        redirect("/");
    }

    const handleGoogleSignIn = () => {
        signIn('google');
    };

    const handleGithubSignIn = () => {
        signIn('github');
    };

    if (loading) {
        return <LoginLoading />;
    }


    return (
        <div class="flex justify-center text-nav-text relative items-center h-screen lg:h-[calc(100vh-100px)] w-full">
            <div className={`${urbanist.className} flex justify-center w-full items-center`}>
                <div className="absolute inset-0 z-0 bg-cover bg-center bg-opacity-50" style={{ backgroundImage: "url('/images/loginBg.jpg')", height: "100%", filter: "brightness(50%)" }} />
                <div className='hidden z-40 lg:flex lg:flex-col text-nav lg:gap-20 lg:w-2/4'>
                    <div>
                        <h1 className='font-bold lg:text-5xl md:text-4xl'>Become a Member</h1>
                    </div>
                    <div>
                        <ul className='flex flex-col gap-5 lg:text-2xl'>
                            <li>
                                <b className='text-3xl'>Add your own recipes :</b><br />Share your culinary creations.
                            </li>
                            <li>
                                <b className='text-3xl'>Save recipes :</b><br /> Keep your favorites handy.
                            </li>
                            <li>
                                <b className='text-3xl'>Rate recipes :</b> <br />Help recipe owners improve by sharing your feedback.
                            </li>
                            <li>
                                <b className='text-3xl'>Give reviews :</b> <br />Share your experiences with the community.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='z-50 bg-nav px-10 py-10 gap-6  rounded-3xl flex flex-col justify-evenly lg:px-20 lg:py-16 md:transform-none'>
                    <div className='flex justify-center'>
                        <h1 className=" font-bold text-3xl text-center">Login</h1>
                    </div>
                    <div className='flex flex-col gap-4 '>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-xl'>
                                Username
                            </h1>
                            <input type='text' className='rounded-lg bg-search-bar py-3 px-5' />
                            <h1 className='text-xl'>
                                Password
                            </h1>
                            <input type='password' className='rounded-lg bg-search-bar py-3 px-5' />
                            <button className='bg-blue-600 p-3 rounded-md text-white'>Sign in</button>
                        </div>
                        <h1 className=' text-center'>Or</h1>
                        <div className='flex flex-col gap-4'>
                            <button onClick={handleGoogleSignIn} className='bg-red-600 p-3 rounded-md text-white'><GoogleIcon /> Google</button>
                            <button onClick={handleGithubSignIn} className='bg-blue-400 p-3 rounded-md text-white'><GitHubIcon /> GitHub</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
