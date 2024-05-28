"use client"

import { signIn } from "next-auth/react";
import Image from "next/image";
import logo from "../public/logo.jpg";

const Login = () => {
  return (
    <div className="bg-teal-700 h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold flex">
          <Image src={logo} alt="Logo for" className="rounded-full w-14 mr-5" />
          DumbAI
        </h1>
        <button onClick={() => signIn('google')} className="mt-5 text-2xl bg-slate-700/[0.6] animate-pulse duration-200 hover:bg-gray-100 hover:text-black w-fit px-10 py-2 rounded-full">
            Sign in
        </button>
    </div>
  )
}

export default Login