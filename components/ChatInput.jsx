'use client'

import { useState } from 'react';
import { ArrowUpIcon } from '@heroicons/react/16/solid';

const ChatInput = () => {
    const [prompt, setPrompt] = useState("");
  return (
    <div>
        <form className='flex p-4 m-4 border rounded-xl'>
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