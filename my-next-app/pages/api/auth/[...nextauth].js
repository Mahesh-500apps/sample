import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin", // Optionally, you can customize the sign-in page here
  },
  callbacks: {
    // Customize the redirect logic after sign-in
    async redirect() {
      // Always redirect to /csv-mapping after successful Google sign-in
      return "/csv-mapping";
    },
  },
});
