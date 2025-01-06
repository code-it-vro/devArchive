import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Login with password",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};
        const user = { name: "ashutosh", id: "1", username: "ashutosh10" };

        if (username === user.username && password === "yourpassword") {
          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
