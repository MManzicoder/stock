export const validate = (values, show) =>{
    const errors = {
        fnameError: "",
        lnameError: "",
        emailError: "",
        passwordError: "",
        matchError: "",
        valid: true

    }
    const useRegex = /^\S+@\S+\.\S+$/;
    let { fnameError, lnameError, emailError, passwordError, matchError, valid } = errors;
    fnameError = values.firstname.length < 1  ? "Firstname is required!" : "";
    lnameError = values.lastname.length < 1  ? "Lastname is required!" : "";
    emailError = values.email.length < 1  ? "Email is required!" : (useRegex.test(values.email)  ? "Invalid email adress!" : "");
    passwordError = values.password.length < 1  ? "Password is required!" : (values.password.length > 0 && values.password.length < 8 ? "Password must be atleast 8 characters long!" : "");
    matchError = values.retype.length < 1  ? "Re-enter Password!" : (values.retype !== values.password ? "Passwords don't match!" : "")
    if(errors){
        valid = false
    }
    
    return { errors };
}