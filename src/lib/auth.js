import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { connectToDb } from "./utils";
import bcrypt from 'bcrypt'
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "./models";
import { authConfig } from "./auth.config";

export const login = async(credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({email: credentials.email});
        console.log("credentials",user)
        if(!user){
            throw new Error("Wrong credentials!")
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if(!isPasswordCorrect){
            throw new Error("Wrong credentials!")
        }

        return user;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to login!")
    }
}

export const { handlers:{GET, POST}, auth, signIn, signOut } = NextAuth({ ...authConfig,
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialProvider({
        async authorize(credentials){
            try {
                const user = await login(credentials);
                return user
            } catch (error) {
                return null
            }
        }
    })
  ],
  callbacks:{
    async signIn({ account, profile}){
        console.log("this profile ", profile)
        if (account.provider === "github"){
            connectToDb();
            try {

                const user = await User.findOne({email: profile.email})

                if(!user){
                    const newUser = new User({
                        username:profile.login,
                        email:profile.email,
                        image:profile.avatar_url.toString(),
                    })
                    await newUser.save();
                }

                return user
                
            } catch (error) {
                console.log(error);
                return false
            }
        }
        return true
    },
    ...authConfig.callbacks,
  }
});
