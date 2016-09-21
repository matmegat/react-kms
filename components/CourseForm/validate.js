const CourseFormValidate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = 'Required';
  }
  if (!values.subtitle) {
    errors.subtitle = 'Required';
  }
  if (!values.thumbnail) {
    errors.thumbnail = 'Required';
  }
  return errors;
};

export default CourseFormValidate;
