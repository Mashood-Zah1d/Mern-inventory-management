import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../Input/Input';

function Signin() {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const [error,setError] = useState("");
    const [response,setResponse] = useState("");

    const login = async (data) => {
        try {
            const res = await fetch(`http://localhost:8000/api/v1/admin/login`,{
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({...data})
            })
    
            if (!res.ok) {
                const errData = res.json();
                setError(res.message || "SomeThing Went Wrong");
                return;
            }
            const result = res.json();
            setResponse(result.message || "Logged In Successfull")
        } catch (error) {
            setError(error.message);
        }

    }
  return (
     <div className="max-w-md mx-auto my-25 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign-In Form</h1>
        <form onSubmit={handleSubmit(login)}>
         <Input
         label="username"
         type = "text"
         className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
         placeholder = "Enter Your User Name"
         {...register(`username`,{required:"Enter Your UserName Please"})}
         />
         {errors.username && <p className='text-red-500 mb-4'>{errors.username}</p>}

         <Input
         label="email"
         type = "email"
         className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
         placeholder = "Enter Your email"
         {...register(`email`,{required:"Enter Your Email Please"})}
         />
         
         {errors.email && <p className='text-red-500 mb-4'>{errors.email}</p>}

        <Input
         label="password"
         type = "password"
         className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
         placeholder = "Enter Your Password"
         {...register(`password`,{required:"Enter Your Password Please"})}
         />
         
         {errors.password && <p className='text-red-500 mb-4'>{errors.password}</p>}
         {error && <p className='text-red-500 mb-4'>{error}</p>}
         {response && <p className='text-green-500 mb-4'>{response}</p>}

        <button type='submit' className='w-40'>
          Login
        </button>
        </form>
            </div>
  )
}

export default Signin