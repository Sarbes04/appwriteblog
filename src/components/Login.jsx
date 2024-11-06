import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        //ye basic functionality hai error ko clean karna after submission
        try {
            const session = await authService.login(data)
            //ab agar session exist karega to user logged in hai, nahi to logged in nahi hai
            if(session){
                const userData = await authService.getCurrentUser() 
                if(userData){
                    dispatch(authLogin(userData))
                }
                //navigate() ki madad se bina click kare hum us page tak pohoch jayenge
                navigate("/")
            } 
        } catch (error) {
            setError(error.message)
        }  
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p> 
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    //ye ... likhna zaroori hai kyoki kahin aur input mein hum ye register use karenge to uski value overwrite ho jayegi
                    //jo object login ke (data) mein jayega wo isi register ki madad se jayega isliye register mein naam unique rakhna
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}  
                    //ye regex expression hai alag alag resources hai isko generate karne ki ye email email ke form mein hai ki nahi ye check karta hai
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    <Button type='submit' className='w-full'>Sign in</Button>
                </div>
            </form>
        </div>
    </div>
  )
}
//handlesubmit ek method hai jahan hum apna method dete hain ki mai is tarah se form ko handle karunga
//handlesubmit actually mein ek event hai, jab hum input boxes mein values change karte hain,
//hume state manage karne ki zarurat nahi padegi wo apne aap register ka use karte hue values input
//field se utha kar lelega 
//input ka placeholder ...props mein jaayega aur display ho jayega
//agar errors hai to <p> ke baad usko display karwa diya gaya hai
