import NextAuth, { Session, User, JWT } from "next-auth";
import Credentials from 'next-auth/providers/credentials'
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github"
import bcrypt from 'bcryptjs'
import {prisma} from '@/prisma/prisma'
export const {handlers,signIn,signOut,auth} =NextAuth({

    providers: [
        GitHub,
        Credentials({
            credentials:{
                email : { label: 'Email', type: 'email',placeholder: 'Email'},
                password: { label: 'Password', type: 'password',placeholder: 'Password'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Missing credentials');
                }

                try {
                    const user = await prisma.user.findUnique({
                        where: { email: credentials.email as string },
                    });

                    if (!user) {
                        throw new Error('No user found with this email');
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password as string, user.password as string);

                    if (!isPasswordCorrect) {
                        throw new Error('Incorrect password');
                    }

                    console.log(user,'is the logged in user')

                    return { 
                      id: user.id, 
                      name: user.name, 
                      email: user.email, 
                      isAdmin: user.isAdmin, 
                      image: user.image
                    };
                } 
                catch (error) {
                    console.error('Error during authorization:', error);
                    throw new Error('Authorization failed');
                }
            }
        })
    ],
    adapter: PrismaAdapter(prisma),  
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
    },
    callbacks: {
        async session({
            session,
            token,
        }: {
            session: Session;
            token: JWT;
        }): Promise<Session> {
            if (token) {
                session.user = {
                    id: token.id!,
                    name: token.name!,
                    email: token.email!,
                    image: token.image!,
                    isAdmin: token.isAdmin ?? false,
                };
            }
            return session;
        },
        async jwt({
            token,
            user,
        }: {
            token: JWT;
            user?: User;
        }): Promise<JWT> {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.image = user.image;
                token.isAdmin = user.isAdmin;
            }
            return token;
        },
    },
    logger: {
        error: (message: string) => {
            console.error(message);
        },
        warn: (message: string) => {
            console.warn(message);
        },
        debug: (message: string) => {
            console.debug(message);
        },
        trace: (message: string) => {
            console.trace(message);
        },
    },
    debug: true,
});