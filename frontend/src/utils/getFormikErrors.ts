import { FieldError } from "../generated/graphql";

export const getFormikErrors = (
  errors: Array<FieldError>
): Record<string, string> | {} => {
  let formikErrors: Record<string, string> = {};
  errors.forEach((err) => {
    formikErrors[err.field] = err.message;
  });
  return formikErrors;
};
