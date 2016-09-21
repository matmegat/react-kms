const PasswordResetValidation = values => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Required';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Does not match the entered password';
  }
  return errors;
};

export default PasswordResetValidation;
