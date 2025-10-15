import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
import Input from '../Input/Input';
import {Link} from 'react-router-dom'
function Signup() {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const [error,setError] = useState("");
    const [response,setResponse] = useState("");
    const Register = async (data) => {
        setError("");
        setResponse("");
        try {
            const res = await fetch(`http://localhost:8000/api/v1/admin/register`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({...data})
            })

            if (!res.ok) {
                const errData = await res.json();
                setError(errData.message || "Something Went")
                return;
            }

            const result = await res.json();
            setResponse(result.message)
        } catch (error) {
            setError(err.message || "Network error");
        }
    }
  return (
    <>
     <div className="max-w-md mx-auto my-25 bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign-Up Form</h1>
    <form onSubmit={handleSubmit(Register)}>
    <Input
    label = "name"
    className = "w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
    placeholder = "Enter Your Name"
    {...register(`name`,{required:"Name Is Required"})}
    />

     <Input
    label= "username"
    type = "text"
    className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
    placeholder= "Enter Your Password"
    {...register('username',{
        required:"Username is Required"
    })}
    />

    {errors.name && <p className='text-red-500'>{errors.name}</p>}
    <Input
    label="Email"
    type = "email"
    className ="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
    placeholder = "Enter Your Email"
    {...register('email',{
        required:"Email Is Required",
        validate:{
            matchPattern:(value)=>{
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Enter Valid Email"
            }
        }
    })}
    />
    {errors.name && <p className='text-red-500'>{errors.name}</p>}

    <Input
    label= "Password"
    type = "password"
    className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
    placeholder= "Enter Your Password"
    {...register('password',{
        required:"Password is Required",
        validate: {
            matchPattern: (value) => {
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value) || "Enter Valid Password"
            }
        }
    })}
    />

     <Input
    label= "Key"
    type = "password"
    className="w-full border my-4 border-gray-300 rounded-lg px-4 py-2 mt-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
    placeholder= "Enter Your Password"
    {...register('secretKey',{
        required:"secretKey is Required",
    })}
    />
    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

    {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
    {response&& <p className='text-green-500'>{response}</p>}
    <button type="Submit">
          Create Account
    </button>
    </form>
    
    </div>
    </>
  )
}

export default Signup