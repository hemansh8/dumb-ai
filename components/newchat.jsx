'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database } from '../firebase'

const NewChat = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(database, 'users', session && session.user && session.user.email, 'chats'), {
      messages: [],
      userId: session && session.user && session.user.email,
      createdAt: serverTimestamp()
    });

    router.push(`/chat/${doc.id}]}`);
  }

  return (
    <button onClick={createNewChat}>+ New Chat</button>
  )
}

export default NewChat