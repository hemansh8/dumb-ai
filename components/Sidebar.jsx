'use client'

import { signOut, useSession } from "next-auth/react";
import NewChat from "./newchat";
import { collection, query, orderBy } from "firebase/firestore";
import { database } from "../firebase";
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatRow from "./ChatRow";


const Sidebar = () => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(
      collection(database, 'users', session && session.user && session.user.email, 'chats'),
      orderBy('createdAt', 'asc')
    )
  );

  return (
    <div className="p-2 flex flex-col h-screen justify-between">
        <div>
            <NewChat />
            { chats && chats.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id} />
            ))}
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