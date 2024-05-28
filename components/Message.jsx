const Message = ({ message }) => {
    const messageBlock = message.data();
    const isChatGPT = messageBlock.user.name === "ChatGPT";
  return (
    <div className={`flex items-center space-x-6 px-10 py-5 mt-5 max-w-3/4  ${!isChatGPT && "bg-[#464646] ml-auto mr-5 pl-7 rounded-full w-fit rounded-br-none"}`}>
        { isChatGPT && <img className="h-8 w-8 object-cover rounded-full" src={messageBlock.user.avatar} />}
        <p className="text-sm">{messageBlock.text}</p>
    </div>
  )
}

export default Message