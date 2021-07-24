import { EMAIL_REGEX } from "../constants";
import { FieldError } from "types/ErrorTypes";
import { UserRegisterInputs, UserLoginInputs } from "types/UserTypes";

export const validateReigsterInputs = (
  options: UserRegisterInputs
): Array<FieldError> => {
  let errorArr: Array<FieldError> = [];
  if (options.username.length < 3) {
    errorArr.push({
      field: "username",
      message: "Username must at least 3 characters",
    });
  }
  if (!EMAIL_REGEX.test(options.email)) {
    errorArr.push({
      field: "email",
      message: "Please input a valid email",
    });
  }
  if (options.password.length < 3) {
    errorArr.push({
      field: "password",
      message: "Password must be of length 3",
    });
  }

  return errorArr;
};

export const validateLoginInputs = (
  options: UserLoginInputs
): Array<FieldError> => {
  let errArr: Array<FieldError> = [];
  if (options.usernameOrEmail.length < 3) {
    errArr.push({
      field: "usernameOrEmail",
      message: "Username/Email must at least 3 characters",
    });
  }
  if (options.password.length < 3) {
    errArr.push({
      field: "password",
      message: "Password must be of length 3",
    });
  }
  if (
    options.usernameOrEmail.includes("@") &&
    !EMAIL_REGEX.test(options.usernameOrEmail)
  ) {
    errArr.push({
      field: "usernameOrEmail",
      message: "Please input a valid email",
    });
  }
  return errArr;
};
