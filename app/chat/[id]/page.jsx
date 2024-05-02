import Chat from "../../../components/Chat";
import ChatInput from "../../../components/ChatInput";

const ChatPage = () => {
  return (
    <div className="flex flex-col justify-between h-screen overflow-hidden">
      <Chat />
      <ChatInput />
    </div>
  )
}

export default ChatPage;