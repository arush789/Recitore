import React from "react";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Loader = () => {
    return (
        <div>
            <div className=" flex w-full justify-center h-[calc(100vh-100px)] items-center">
                <h1 className={`${dancingScript.className} animate-bounce h-10 text-5xl`}>Recitore</h1>
            </div>
        </div>
    )
}

export default Loader