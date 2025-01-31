import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { MasukSchema } from "@/lib/zod"
import { compareSync } from "bcrypt-ts"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session:{strategy: "jwt"},
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials:{
        username: {},
        password: {},
      },
      authorize: async (credentials) =>{
        const validatedField = MasukSchema.safeParse(credentials);

        if(!validatedField.success){
          return null;
        }

        const { username, password } = validatedField.data;

        const user = await prisma.user.findUnique({
          where: {username}
        })

        if(!user || !user.password) {
          throw new Error("User tidak ditemukan");
        }
        const passwordMatch = compareSync(password, user.password);

        if(!passwordMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const ProtectedRoutes = ["/"];

      if (!isLoggedIn && ProtectedRoutes.includes(nextUrl.pathname)) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      if (isLoggedIn && nextUrl.pathname.startsWith("/login")) {
        return Response.redirect(new URL("/login", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },

    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.username = token.username; 
      return session;
    },
  },
});