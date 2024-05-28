'use client'

import { collection, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { database } from "../firebase";
import { TrashIcon } from "@heroicons/react/16/solid";

const ChatRow = ({ id }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [active, setActive] = useState(false);

  const [ messages ] =  useCollection(
    session && query(
      collection(database, 'users', session && session.user && session.user.email, 'chats', id, 'messages'),
      orderBy('createdAt', 'asc')
    )
  );

  useEffect(() => {
    pathname && setActive(pathname.includes(id));
  }, [pathname])

  const removeChat = async () => {
    await deleteDoc(doc(database, 'users', session && session.user && session.user.email, 'chats', id));
    router.replace('/');
  };

  const chatName = messages && messages.docs[0] && messages.docs[0].data().text;
  return (
    <Link href={`/chat/${id}`} className={`mt-2 p-2 flex justify-between items-center rounded ${active && "bg-gray-700"} hover:bg-slate-500/30 transition ease-in`}>
        <p className="truncate capitalize">{chatName || "New Chat"}</p>
        <TrashIcon onClick={() => removeChat()} className="h-4 w-4 ml-2 hover:text-red-700"/>
    </Link>
  )
}

export default ChatRow