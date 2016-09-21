const LessonFormValidation = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Required';
  }

  if (!values.thumbnail) {
    errors.thumbnail = 'Required';
  }

  return errors;
};

export default LessonFormValidation;
