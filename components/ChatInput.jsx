'use client'

import { useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/16/solid';
import { useSession } from 'next-auth/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database } from '../firebase';
import toast from  'react-hot-toast';

const ChatInput = ({ chatId }) => {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();
    const model = 'gpt-3.5-turbo';

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!prompt) return;

        const message = {
            text: prompt.trim(),
            createdAt: serverTimestamp(),
            user: {
                _id: session.user.email,
                name: session.user.name,
                avatar: session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`
            }
        }
        setPrompt("");

        await addDoc(
            collection(database, 'users', session.user.email, 'chats', chatId, 'messages'),
            message
        );

        const notification = toast.loading('dumbAI is thinking...');

        await fetch('/api/askQuestion', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: message.text, chatId, model, session
            })
        }).then((resp) => {
            console.log(resp);
            toast.success('dumbAI has responded!', {
                id: notification
            })
        }).catch(err => {
            console.log(err);
        });
    }
  return (
    <div>
        <form onSubmit={sendMessage} className='flex p-4 m-4 border rounded-xl'>
            <input type="text"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder='Type your input here'
                className='w-full text-slate-300 bg-transparent focus:outline-none'
            />
            <button type="submit" 
                disabled={!prompt} 
                className='bg-teal-700 hover:opacity-70 transition disabled:bg-gray-700/20 disabled:text-slate-300/20 p-2 rounded-xl'>
                <ArrowUpIcon className='h-6 w-6' />
            </button>
        </form>
    </div>
  )
}

export default ChatInput