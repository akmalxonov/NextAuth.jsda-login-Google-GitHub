import { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/app/data/users";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_GITHUB_AUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GITHUB_AUTH_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_AUTH_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_AUTH_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = getUserByEmail(credentials.email);
        if (!user) {
          throw new Error("User not found");
        }
        const isMatch = credentials.password === user.password;
        if (!isMatch) {
          throw new Error("invalid password");
        }
        return {
          id: user.email,
          email: user.email,
        };
      },
    }),
  ],
};
