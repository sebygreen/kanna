const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePostInput(data) {
    let errors = {};

    // convert empty fields to empty strings (validator throws an error if not)
    data.title = !isEmpty(data.title) ? data.title : '';
    data.text = !isEmpty(data.text) ? data.text : '';
    data.price = !isEmpty(data.price) ? data.price : '';

    if (Validator.isEmpty(data.title)) { // email checks
        errors.title = "Please add a title";
    }

    if (Validator.isEmpty(data.text)) { // email checks
        errors.text = "Please fill in the text field";
    }

    if (Validator.isEmpty(data.price)) { // email checks
        errors.price = "Please set a price";
    }
    else if (!Validator.isInt(data.price)) { // email checks
        errors.price = "Input isn't a number";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
}