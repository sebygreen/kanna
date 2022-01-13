const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // convert empty fields to empty strings (validator throws and error is not)
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    if (Validator.isEmpty(data.name)) { // name check
        errors.name = "Name field is required";
    }

    if (Validator.isEmpty(data.email)) { // email checks
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) { // password content checks
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password field is required";
    }

    if (!Validator.isLength(data.password, {min: 6, max: 30})) { // password length check
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password, data.password2)) { // compare the two passwords
        errors.password2 = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}