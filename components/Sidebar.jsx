'use client'

import { signOut, useSession } from "next-auth/react";
import NewChat from "./newchat";

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <div className="p-2 flex flex-col h-screen justify-between">
        <div>
            <NewChat />
        </div>

        {
          session && session.user && 
          <img src={session.user.image}
            onClick={() => signOut()}
            alt="Profile pic" 
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          />
        }
    </div>
  )
}

export default Sidebar