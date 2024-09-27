// import { useState, React } from "react";

const errMessage = "This Field Is Required";

const isNotEmpty = (value) => {
  if (value !== "") {
    return "";
  } else {
    return errMessage;
  }
};

const ValidationSchema = {
  userName: isNotEmpty,
  passWord: isNotEmpty
};

export function ValidateForm(values) {
  const errors = {};
  Object.keys(ValidationSchema).forEach((fieldName) => {
    const value = values[fieldName];
    const test = ValidationSchema[fieldName];
    const error = test(value);
    if (error) errors[fieldName] = error;
  });

  return errors;
}

export function ValidateField(fieldName, value) {
  const error = ValidationSchema[fieldName](value);

  return error;
}
