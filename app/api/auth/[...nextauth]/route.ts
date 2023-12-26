
import connectToDB from '@/db/db';
import User from '@/db/models/User.model';
import bcrypt from 'bcrypt';
import NextAuth, { Account, User as AuthUser } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";


export  const authOptions:any = {
    
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials:{
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials: any){
                await connectToDB()
                try {
                    const user = await User.findOne({ email: credentials.email});
                    if(user){
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                        if(isPasswordCorrect){
                            return user
                        }
                    }
                } catch (error:any) {
                    throw new Error(error.message)
                }
            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({user, account }: {user: AuthUser, account: Account}){
            if(account?.provider == "credentials"){
                return true;
            }
            if(account?.provider == "github"){
                await connectToDB()
                try {
                    const exitingUser = await User.findOne({email: user.email})
                    if(!exitingUser){
                        const newUser = new User({
                            email: user.email,
                        })

                        await newUser.save()
                        return true;
                    }
                    
                } catch (error:any) {
                     console.log("Error while saving user in db after login with github", error);
                    return false;                  
                }
            }
        }
    }
    
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
