export default LoginScreenValidation = () => {
    const validateInput = (username, password) => {
        return username && password
    }

    return {
        validateInput,
    };
}