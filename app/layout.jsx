import "./globals.css";
import Sidebar from "../components/Sidebar";
import SessionWrapper from "../components/SessionWrapper";
import Login from "../components/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import ClientProvider from '../components/ClientProvider';

export const metadata = {
  title: "Dumb AI",
  description: "A chat-gpt clone for all your dumb questions",
};

export default async function RootLayout({ children }) {

  const session = await getServerSession(authOptions);
  
  return (
    <html>
      <body>
        <SessionWrapper session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <Sidebar />
              <ClientProvider />

              <div className="content bg-[#343434] flex-1">
                {children}
              </div>
            </div>
          )}
        </SessionWrapper>
      </body>
    </html>
  );
}
