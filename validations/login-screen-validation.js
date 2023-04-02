export default LoginScreenValidation = () => {
    const validateInput = (email, password) => {
        return email && password
    }

    return {
        validateInput,
    };
}