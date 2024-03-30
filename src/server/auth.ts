/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/server/db";
import { type HCL_user } from "@prisma/client";
import bcrypt from "bcrypt";
import { getImprovSession } from "utilitiesBackend";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    // paloki1: string;
    // paloki: string;
    user: {
      id: string;
      // ...other properties
      email: string;
      sub: string;
      avatar_url: string;
      isApproved: boolean;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PRIVATE_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "your-email",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        // console.log(credentials);
        // console.log("LOGGING IN");
        try {
          const foundUser: HCL_user = await db.hCL_user.findUniqueOrThrow({
            where: { email: credentials!.email },
          });

          if (foundUser) {
            // console.log("User Exists");
            // console.log(foundUser);
            const match = await bcrypt.compare(
              credentials!.password,
              foundUser.password,
            );

            if (match === true) {
              // console.log("Good Pass");
              foundUser.password = " ";

              // foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          // console.log(error);
        }
        return null;
      },
    }),

    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  callbacks: {
    async jwt({ user, token, profile }: any) {
      console.log(token);
      console.log(profile);

      console.log(user);
      console.log("jwt callback");
      if (user) {
        user.isApproved = token.isApproved;
        user.isAdmin = token.isAdmin;
        user.sub = token.sub;
      }

      // user.paloki = "paloki1";
      // user.paloki1 = "paloki1";
      return { ...token, ...user };
    },
    async session({ session, token, profile }: any) {
      console.log(token);
      console.log(profile);
      console.log(session);
      console.log("session callback");
      console.log();
      if (session?.user) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const adhocSession = await getImprovSession(token.email);
        session.user.isApproved = token.isApproved;
        session.user.isAdmin = token.isAdmin;
        session.user.sub = token.sub;
        token.isAdmin = adhocSession.isAdmin;
        token.isApproved = adhocSession.isApproved;
      }

      return { ...token, ...session, profile };
    },
    // session: ({ session, user }) => ({
    // ...session,
    // user: {
    // ...session.user,
    // id: user.id,
    // },
    // }),
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
