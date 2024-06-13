import { Input } from "../../ui/Input"
import { useForm, type SubmitHandler } from "react-hook-form"
import { LoginFormData,validationSchema } from "./types";
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react';
import { useAuthContext } from "../Auth/AuthContext";
import { Textarea } from "../../ui/Textarea";

export const AddPost = () => {
    const inputClass = "bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 break-words"
    const labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    const { register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({ resolver: zodResolver(validationSchema)});
    const [message, setMessage] = useState('');
    const { username } = useAuthContext();

    const handleLoginForm: SubmitHandler<LoginFormData> = async (data) => {
        const response = await fetch('http://localhost:5000/post/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name : data.name,
            content : data.content,
            author: username,
        }),
      });
      const responseData = await response.json();
      if (response.ok) {
        setMessage(`Success: ${responseData.message}`);
      } else {
        setMessage(`Error: ${responseData.message}`);
      }
    console.log()
        };

    return (
    <section className="bg-gray-50 dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center  px-6 py-8 mx-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Add new post
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleLoginForm)}>
                        <div>
                            <Input
                                label="Post topic"
                                {...register("name")}
                                inputClassName={inputClass}
                                labelClassName={labelClass}
                                placeholder="your topic"
                                error={errors.name}
                            />
                        </div>
                        <div>
                            <Textarea label="Post content"
                                {...register("content")}
                                inputClassName={inputClass}
                                labelClassName={labelClass}
                                placeholder="your content"
                                error={errors.content}></Textarea>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Add</button>
                    </form>
                    {message && <p>{message}</p>}

                </div>
            </div>
        </div>
    </section>
    )
}