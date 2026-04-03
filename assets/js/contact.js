window.validateContactForm = function validateContactForm(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(values.email || "")) {
    errors.email = "Please provide a valid email address.";
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
};
