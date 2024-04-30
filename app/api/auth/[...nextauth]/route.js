// imports
import NextAuth from "next-auth"

// importing providers
import GoogleProvider from "next-auth/providers/google";


export const authOptions = {
  providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET
        })
  ]
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }