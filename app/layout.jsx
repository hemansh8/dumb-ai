import "./globals.css";

export const metadata = {
  title: "Dumb AI",
  description: "A dumber chat-gpt clone",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* sidebar */}

        {/* clientProvider */}

        <div className="content bg-[#343434] flex-1">
          {children}
        </div>
      </body>
    </html>
  );
}
