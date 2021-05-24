const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // convert empty fields to empty strings (validator throws an error if not)
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) { // email checks
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.password)) { // password check
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}