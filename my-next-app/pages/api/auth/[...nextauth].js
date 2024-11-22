import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        562011749075 -
        gl7uu30ck53aavbnmrbhn4qvhfu39hdo.apps.googleusercontent.com,
      clientSecret: GOCSPX - faB1yw6aw10oCZA6K49BXV_XmauD,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
  },
  callbacks: {
    async redirect() {
      // Redirect users to the CSV Mapping page after login
      return "/csv-mapping";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
