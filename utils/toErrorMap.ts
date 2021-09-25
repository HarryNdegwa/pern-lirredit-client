import { FieldError } from "../generated/graphql";
import { authErrors } from "./auth";

export const toErrorMap = (errors: FieldError[]): authErrors => {
  const errorMap: any = {};
  for (let error of errors) {
    errorMap[error.field] = error.message;
  }

  return errorMap as authErrors;
};
