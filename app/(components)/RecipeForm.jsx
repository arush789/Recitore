"use client"
import { useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE_API_KEY}`,
    authDomain: "recitore-f7ff4.firebaseapp.com",
    projectId: "recitore-f7ff4",
    storageBucket: "recitore-f7ff4.appspot.com",
    messagingSenderId: "252005741069",
    appId: "1:252005741069:web:9a8c678d23ffa46b73db44",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

import { Urbanist } from "next/font/google";
import Loading from "./Loading";
const urbanist = Urbanist({ subsets: ["latin"] });

const RecipeForm = () => {
    const { data: session } = useSession()
    const [imgURL, setImgURL] = useState()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (!session?.user?.name) {
            redirect("/YourRecipes");
        }
    }, [session]);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0]
        setLoading(true)
        if (selectedFile) {
            const storageRef = firebase.storage().ref()
            const fileRef = storageRef.child(selectedFile.name)

            fileRef.put(selectedFile)
                .then((snapshot) => {
                    snapshot.ref.getDownloadURL()
                        .then((downloadURL) => {
                            setImgURL(downloadURL)
                            setFormData((prev) => ({
                                ...prev,
                                imgURL: downloadURL
                            }))
                            console.log(downloadURL)
                            setLoading(false)
                        })
                })
        } else {
            alert("No file selected")
        }
    }

    const handleRemoveImage = () => {
        setLoading(true);
        const storageRef = firebase.storage().refFromURL(imgURL);
        storageRef.delete()
            .then(() => {
                setImgURL('');
                const fileInput = document.querySelector('input[type="file"]');
                fileInput.value = '';
            })
            .catch((error) => {
                console.error('Error removing image:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };


    const handleChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("api/Recipes", {
                method: "POST",
                body: JSON.stringify({ formData }),
                "content-type": "application/json"
            });

            if (!res.ok) {
                throw new Error("Failed to create recipe");
            }

            router.refresh();
            router.push("/YourRecipes");
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    const startingFormData = {
        title: "",
        ingredients: "",
        procedure: "",
        category: "",
        user: `${session?.user?.name}`,
        imageURL: ""
    }

    const [formData, setFormData] = useState(startingFormData)



    return (
        <div className={`${urbanist.className} flex justify-center py-20 font-bold`}>
            <form className="px-4 w-[90%] lg:px-20 flex flex-col gap-10 bg-nav text-nav-text rounded-lg py-10 lg:w-4/5" method="post" onSubmit={handleSubmit}>
                <h1 className="text-4xl text-center">Add your recipe</h1>
                <div className="flex flex-col gap-2">
                    <label className="text-3xl">Title</label>
                    <input type="text" placeholder="Title..." name="title" onChange={handleChange} value={formData.title} className="text-nav-text p-3 rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-3xl">Ingredients</label>
                    <p>Add each ingredients in a new line</p>
                    <textarea rows="5" type="text" placeholder="Ingredients..." name="ingredients" onChange={handleChange} value={formData.ingredients} className="text-nav-text p-3 rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-3xl">Procedure</label>
                    <p>Add each steps in a new line</p>
                    <textarea rows="5" type="text" placeholder="Procedure..." name="procedure" onChange={handleChange} value={formData.procedure} className="text-nav-text p-3 rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-3xl">Category</label>
                    <select name="category" onChange={handleChange} value={formData.category} className="text-nav-text p-3 rounded-lg" >
                        <option value="North Indian">North Indian</option>
                        <option value="South Indian">South Indian</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-3xl">Image</label>
                    <div className="relative">
                        <input type="file" name="upload-file" onChange={handleFileUpload} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
                        {!imgURL ? <button className="text-nav p-3 rounded-lg border bg-bgColor ">Upload Image</button> : <></>}
                    </div>
                    {loading && <Loading />}
                    {imgURL && !loading && (
                        <div className="flex flex-col items-start gap-2">
                            <img src={imgURL} alt="Uploaded" />
                            <button className="text-nav p-3 rounded-lg border bg-bgColor " onClick={handleRemoveImage}>Remove Image</button>
                        </div>
                    )}
                </div>
                <button type="submit" className="bg-bgColor rounded-lg p-3 text-nav">Submit</button>
            </form>
        </div>
    )
}

export default RecipeForm