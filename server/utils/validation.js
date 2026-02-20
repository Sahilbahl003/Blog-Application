const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

exports.validateRegister = (data) => {
  const { name, email, password, confirmPassword } = data;
  let errors = {};

  if (!name) {
    errors.name = "Name is required";
  } else if (!nameRegex.test(name)) {
    errors.name = "Name must contain only letters";
  } else if (name.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Must include uppercase, number, special character";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Confirm password is required";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

exports.validateLogin = (data) => {
  const { email, password } = data;
  let errors = {};

  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (!passwordRegex.test(password)) {
    errors.password =
      "Must include uppercase, number, special character";
  }

  return errors;
};

exports.formatZodErrors = (error) => {
  const errors = {};
  error.errors.forEach((err) => {
    const field = err.path[0];
    if (!errors[field]) {
      errors[field] = err.message;
    }
  });
  return errors;
};

