'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database } from '../firebase'

const NewChat = ({text}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(database, 'users', session && session.user && session.user.email, 'chats'), {
      messages: [],
      userId: session && session.user && session.user.email,
      createdAt: serverTimestamp()
    });

    router.push(`/chat/${doc.id}`);
  }

  return (
    <button 
      className={`mt-2 p-2 text-center ease-in duration-200 border border-transparent hover:border-gray-700 rounded-full ${text ? "w-fit px-10 mt-5 bg-teal-700/10 hover:bg-teal-700" : "w-full"} `}
      onClick={createNewChat}
    >
      {text || "+ New Chat"}
    </button>
  )
}

export default NewChat