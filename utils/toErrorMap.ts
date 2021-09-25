import { FieldError } from "../generated/graphql";
import { registerErrors } from "../pages/register";

export const toErrorMap = (errors: FieldError[]): registerErrors => {
  const errorMap: any = {};
  for (let error of errors) {
    errorMap[error.field] = error.message;
  }

  return errorMap as registerErrors;
};
