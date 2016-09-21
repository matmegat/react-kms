const CreatePortalValidation = values => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.isAccepted) {
    errors.isAccepted = 'You must accept to continue';
  }

  return errors;
};

export default CreatePortalValidation;
