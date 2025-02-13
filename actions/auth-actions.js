// Suggested code may be subject to a license. Learn more: ~LicenseLog:2182004419.
// Suggested code may be subject to a license. Learn more: ~LicenseLog:1946985642.
'use server';

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

    
    

    //create a new user
}