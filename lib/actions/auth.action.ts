'use server';

// import { db } from "@/firebase/client";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";
const ONE_WEEK = 60 * 60 * 24 * 7;
export async function signUp( params: SignUpParams) {
    const {uid , name , email} = params;
    try {
        const userRecord = await db.collection('users').doc(uid).get();
        if(userRecord.exists){
            return {
                success: false,
                message: 'User already exists.Please sign in.'
            }
        }
        await db.collection('users').doc(uid).set({
            name,
            email,
        });
        return {
            success: true,
            message: 'Account created successfully. Redirecting... to sign in page'
        }

    }catch(e : any){
        console.error('Error creating user:', e);
        if(e.code === 'auth/email-already-exists'){
            return {
                success: false,
                message: 'This Email already in use'
            }
        }
        return {
            success: false,
            message: 'This email is already in use'
            }
    }
}
export async function signIn(params: SignInParams) {
    const {email, idToken} = params;
    try {
        const userRecord = await auth.getUserByEmail(email);
        if(!userRecord){
            return {
                success: false,
                message: 'User does not exist. Create an account.'
            }
        }
        await setSessionCookie(idToken);
        return {
            success: true,
            message: 'Signed in successfully. Redirecting...'
        }
    }
    catch(e){
        console.log(e);
        return {
            success: false,
            message: 'There was an error signing in. Please try again.'
        }
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK *1000}); // 7 days
    cookieStore.set('session', sessionCookie, {
        maxAge: ONE_WEEK, // 7 days in seconds
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
}

export async function getCurrentUser(): Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    if(!sessionCookie){
        return null;
    }
    try{
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
        if(!userRecord.exists){
            return null;
        }
        return{
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    }
    catch(e){
        console.log(e);
        return null;


    }

    }

export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user; 
}