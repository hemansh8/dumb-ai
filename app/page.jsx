import NewChat from "../components/newchat";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-bold">DumbAI</h1>
      <NewChat text="Start a new chat" />
    </div>
  );
}
