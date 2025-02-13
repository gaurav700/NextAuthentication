'use server';

import { createAuthSession } from "@/lib/auth";
import { hashUserPassword } from "@/lib/hash";
import { createUser } from "@/lib/user";
import { redirect } from "next/navigation";

export async function signup(prevState, formData){
    const email = formData.get('email');
    const password = formData.get('password');


    // validate users
    let errors = {};
    errors.password = [];
    if(!email.includes('@')){
        errors.email = 'Invalid email address.'
    }

    if (password.trim().length < 8) {
        errors.password.push("Password must be at least 8 characters long")
    }

    if (!/[A-Z]/.test(password)) {
        errors.password.push("Password must contain at least one uppercase letter")
    }
    
    if (!/[a-z]/.test(password)) {
        errors.password.push("Password must contain at least one lowercase letter")
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
        errors.password.push("Password must contain at least one special character")
    }
    if(password.length === 0){
        errors.password.push('Password is required')
    }
    if (errors.password.length === 0) {
        delete errors.password;
    }

    if(Object.keys(errors).length > 0){
        return {
            errors
        }
    }

    // hasing the password
    const newPassword = hashUserPassword(password);
    const newEmail = email.toLowerCase();
    // creating a new user
    try{
        const userId = createUser(newEmail, newPassword);
        // creating a session 
        await createAuthSession(userId);
        // redirect to the page after succesfully creation of user
        redirect('/training');
    }catch(error){
        if(error.code ==='SQLITE_CONSTRAINT_UNIQUE'){
            return {
                errors: {
                    email : 'Please use a different email that doesn\'t already have an account.'
                }
            }
        }
        throw error;
    }
}