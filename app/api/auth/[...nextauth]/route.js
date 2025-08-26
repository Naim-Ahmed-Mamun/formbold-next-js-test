import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import axios from "axios";
import appConfig from "../../../../config/index";
import config from "../../../../services/config";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            async authorize(credentials, req) {
                try {
                    const { data } = await axios.post(
                        `${appConfig.backendBaseURL}/auth/login`,
                        credentials,
                        {
                            ContentType: "application/json",
                        }
                    );
                    const newUser = {
                        ...data?.data?.user,
                        token: data?.data?.token,
                    };
                    return newUser;
                    // return {
                    //   user: ,
                    //   token: ,
                    // emailVerified: data?.data?.emailVerified,
                    // hasSubscription: data?.data?.hasSubscription,
                    // timezones: data?.data?.timezones,
                    // userTimeZone: data?.data?.userTimeZone,
                    // };
                } catch (error) {
                    // console.log(error?.response?.data,'error in credentials');
                    throw new Error(error.response?.data?.message || "Invalid credentials");
                }
            },
        }),

        CredentialsProvider({
            name: "impersonate",
            id: "impersonate",
            async authorize(credentials) {
                // console.log("inside authorize", credentials);

                try {
                    const { data } = await axios.post(
                        `${appConfig.backendBaseURL}/admin/user-login`,
                        {
                            token: credentials?.token,
                        },
                        {
                            ContentType: "application/json",
                        }
                    );
                    const newUser = {
                        ...data?.data?.user,
                        token: data?.data?.token,
                    };
                    return newUser;
                } catch (error) {
                    console.log(error,'error in impersonate');
                    throw new Error(error?.response?.data?.message || "Invalid credentials");
                }
            },
        }),

        GoogleProvider({
            clientId: config.googleClientId,
            clientSecret: config.googleClientSecret,
        }),
        GitHubProvider({
            clientId: config.githubClientId,
            clientSecret: config.githubClientSecret,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: `/auth/login`,
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                token.name = user?.name;
                token.email = user?.email;
                token.sub = user?.id;
                token.picture = user?.image_url;
                token.accessToken = user?.token;
                token.refreshToken = user?.refreshToken;
                token.id = user?.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token?.accessToken;
            }
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
    },
});

export { handler as GET, handler as POST };
