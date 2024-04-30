import "./globals.css";
import Sidebar from "../components/Sidebar";
import SessionWrapper from "../components/SessionWrapper";
import Login from "../components/Login";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Dumb AI",
  description: "A dumber chat-gpt clone",
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
              {/* sidebar */}
              <Sidebar />

              {/* clientProvider */}

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
