// validation.js

function validateInput(inputValue, rules) {
    const errors = {};
  
    for (const rule in rules) {
      switch (rule) {
        case 'required':
          if (rules[rule] && (!inputValue || inputValue.trim() === '')) {
            errors.required = 'Field is required';
          }
          break;
        case 'minlength':
          if (rules[rule] && inputValue.length < rules[rule]) {
            errors.minlength = `Field should have a minimum length of ${rules[rule]}`;
          }
          break;
        case 'maxlength':
          if (rules[rule] && inputValue.length > rules[rule]) {
            errors.maxlength = `Field should have a maximum length of ${rules[rule]}`;
          }
          break;
        case 'email':
          if (rules[rule] && !validateEmail(inputValue)) {
            errors.email = 'Invalid email format';
          }
          break;
        // Add more validation rules as needed
        default:
          break;
      }
    }
  
    // Return validation result
    if (Object.keys(errors).length === 0) {
      return { valid: true };
    } else {
      return { valid: false, errors };
    }
  }
  
  function validateEmail(email) {
    return true;
    // Email validation logic (can use regex or any other validation method)
    // Return true if email is valid, false otherwise
  }
  
  module.exports = { validateInput };
  