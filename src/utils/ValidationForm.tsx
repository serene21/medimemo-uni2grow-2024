// import { useState, React } from "react";

// 


const errMessage = "This Field Is Required";

const isNotEmpty = (value: string): string => {
  return value !== "" ? "" : errMessage;
};

interface ValidationSchemaType {
  [key: string]: (value: string) => string;
}

const ValidationSchema: ValidationSchemaType = {
  userName: isNotEmpty,
  passWord: isNotEmpty
};

interface Values {
  userName: string;
  passWord: string;
}

interface Errors {
  [key: string]: string;
}

export function ValidateForm(values: Values): Errors {
  const errors: Errors = {};
  
  Object.keys(ValidationSchema).forEach((fieldName) => {
    const value = values[fieldName as keyof Values];
    const test = ValidationSchema[fieldName];
    const error = test(value);
    if (error) errors[fieldName] = error;
  });

  return errors;
}

export function ValidateField(fieldName: keyof Values, value: string): string {
  const error = ValidationSchema[fieldName](value);
  return error;
}
