'use client';

import { useCollection } from "react-firebase-hooks/firestore";
import { orderBy, query, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Message from "./Message";
import { database } from '../firebase';
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

const Chat = ({ chatId }) => {
  const { data: session, status } = useSession();


  const [ messages, loading ] = useCollection(
    session && query(
      collection(database, 'users', session && session.user && session.user.email, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc')
    )
  );
  if (status === "loading") {
    return "Loading..."
  }
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden pt-5">
      { !messages || messages.empty && (
        <div className="flex flex-col justify-center h-full">
          <p className="text-center text-xl">Type in your dumb prompt to get started. Can I trust you to follow the arrow?</p>
          <ArrowDownCircleIcon className="h-12 w-12 mx-auto mt-8 animate-bounce"/>
        </ div>
      )}

      {
        messages && messages.docs.map(message =>
          <Message key={message.id} message={message} />
        )
      }

    </div>
  )
}

export default Chat