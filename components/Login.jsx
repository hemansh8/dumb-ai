"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../public/vercel.svg";

const Login = () => {
  return (
    <div className="bg-[#333333] h-screen flex flex-col justify-center items-center">
        <Image 
            src={logo}
            width={300}
            height={300}
            alt="logo"
            className=""
        />
        <button onClick={() => signIn('google')} className="mt-8 text-2xl font-bold animate-pulse">
            Sign in to DumbAI
        </button>
    </div>
  )
}

export default Login