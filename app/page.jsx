import NewChat from "../components/newchat";
import logo from "/public/logo.jpg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold flex">
        <Image src={logo} alt="Logo for" className="rounded-full w-14 mr-5" />
        DumbAI
      </h1>
      <NewChat text="Start a new chat" />
    </div>
  );
}
