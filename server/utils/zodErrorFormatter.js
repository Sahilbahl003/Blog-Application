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
