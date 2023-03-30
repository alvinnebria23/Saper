export const emailRegex = /\S+@\S+\.\S+/;
export const alphabetRegex = /^[a-zA-Z\s]+$/;
export const numericRegex = /^[0-9]+$/;
export const removeNonNumericRegex = /[^0-9]/g;
export const removeInvalidNameRegex = /[^a-zA-Z ]/g;
export const passwordValidationRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{7,15}$/;