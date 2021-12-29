export const Store = state =>{
    const [loginMode, setLoginMode] = state(false);
    const [signupMode, setSignupMode]= state(true);
    const [user, setUser]= state({});
    const [token, setToken] = state("");
    return { loginMode, setLoginMode, signupMode, token, setToken, setSignupMode, user, setUser };
}