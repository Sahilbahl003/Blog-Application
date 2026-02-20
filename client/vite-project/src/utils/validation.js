export const validateField = (name, value, formData = {}) => {
  let message = "";

 if (name === "name") {
    const nameRegex = /^[A-Za-z]+( [A-Za-z]+)*$/;
    const trimmed = value.trim();

    if (!trimmed) {
      message = "Name is required";
    } 
    else if (trimmed.length < 3) {
      message = "Name must be at least 3 characters";
    } 
    else if (trimmed.length > 50) {
      message = "Name too long";
    } 
    // else if(typeof (trimmed) === 'number')
    // {
    //   message = "Name must be alphabet"
    // }
    else if (!nameRegex.test(trimmed)) {
      message = "Name must be alphabet"
    }
  }


  if (name === "email") {
  const val = value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,3}$/;

  if (!val) message = "Email is required";
  else if (val.length > 50) message = "Email too long";
  else if (!emailRegex.test(val)) message = "Invalid email address";
}


  if (name === "password") {
  const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;


  if (!value) {
    message = "Password is required";
  } 
  else if (value.length < 8) {
    message = "Password must be at least 8 characters";
  } 
  else if (value.length > 20) {
    message = "Password too long";
  } 
  else if (!passwordRegex.test(value)) {
    message = "Must include uppercase, lowercase, number, special character";
  }
  else if (value !== formData.password) {
    message = "Passwords do not match";
  }
}

if (name === "currentPassword") {
  const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;


  if (!value) {
    message = "Password is required";
  } 
  else if (value.length < 8) {
    message = "Password must be at least 8 characters";
  } 
  else if (value.length > 20) {
    message = "Password too long";
  } 
  else if (!passwordRegex.test(value)) {
    message = "Must include uppercase, lowercase, number, special character";
  }
}



if (name === "newPassword") {
  const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;


  if (!value) {
    message = "Password is required";
  } 
  else if (value.length < 8) {
    message = "Password must be at least 8 characters";
  } 
  else if (value.length > 20) {
    message = "Password too long";
  } 
  else if (!passwordRegex.test(value)) {
    message = "Must include uppercase, lowercase, number, special character";
  }

  else if (value !== formData.confirmPassword1) {
    message = "Passwords do not match";
  }
}

  if (name === "confirmPassword") {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;

  if (!value) {
    message = "Confirm Password is required";
  } 
  else if (value.length < 8) {
    message = "Password must be at least 8 characters";
  } 
  else if (value.length > 20) {
    message = "Password too long";
  } 
  else if (!passwordRegex.test(value)) {
    message = "Must include uppercase, lowercase, number, special character";
  } 
  else if (value !== formData.password) {
    message = "Passwords do not match";
  }
}

if (name === "confirmPassword1") {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/;

  if (!value) {
    message = "Confirm Password is required";
  } 
  else if (value.length < 8) {
    message = "Password must be at least 8 characters";
  } 
  else if (value.length > 20) {
    message = "Password too long";
  } 
  else if (!passwordRegex.test(value)) {
    message = "Must include uppercase, lowercase, number, special character";
  } 
  else if (value !== formData.newPassword) {
    message = "Passwords do not match";
  }
}


if (name === "confirmPassword1") {
    if (value !== formData.newPassword) message = "Passwords do not match";
  }

  if (name === "confirmPassword") {
    if (value !== formData.password) message = "Passwords do not match";
  }

  // if (name === "password") {
  //   if (value !== formData.confirmPassword) message = "Passwords do not match";
  // }

  

  return message;
};


if(name === "image")
{
  const imageRegex = /\.(jpe?g|png|gif|bmp|webp)$/i;

  if(!value)
  {
    message = "Image is required"
  }
  else if(!imageRegex.test(value))
  {
    message = "Image type should be .png, .jpg, .jpeg"
  }

}






export const validateForm = (formData) => {
  const errors = {};

  Object.keys(formData).forEach((key) => {
    const error = validateField(key, formData[key], formData);
    if (error) errors[key] = error;
  });

  return errors;
};
