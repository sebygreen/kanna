const Validator = require("validator");
const empty = require("is-empty");

module.exports = function validateLoginInput(data) {
    let errors = {};

    // convert empty fields to empty strings (validator throws an error if not)
    data.email = !empty(data.email) ? data.email : '';
    data.password = !empty(data.password) ? data.password : '';

    if (empty(data.email)) { // email checks
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "This email is invalid";
    }

    if (empty(data.password)) { // password check
        errors.password = "Password field is required";
    }

    return {
        errors,
        isValid: empty(errors)
    };
}