import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

const Loading = () => {
    return (
        <div>
            <div
                className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black"
                role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            {/* <div className=" flex w-full justify-center h-[calc(100vh-100px)] items-center">
                <h1 className={`${dancingScript.className} animate-bounce h-10 text-5xl`}>Recitore</h1>
            </div> */}
        </div>
    )
}

export default Loading