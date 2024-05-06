"use strict";

const validateEmail = (email) => {
  return /^\S+@\S+$/.test(email);
};

const validStatus = ["In Progress", "New", "Resolved"];

const validateStatus = (status) => {
  return validStatus.includes(status);
};

const validateDate = (date) => {
  // should be greater than yesterday time
  const today = new Date();
  const yesterday = new Date();
  return new Date(date) > yesterday.setDate(today.getDate() - 1);
};

module.exports = { validateEmail, validateStatus, validateDate };
