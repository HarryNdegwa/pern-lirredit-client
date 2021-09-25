import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import { authErrors } from "../utils/auth";
import { createUrqlClient } from "../utils/createUrlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<authErrors>({
    username: "",
    password: "",
  });

  const router = useRouter();

  const [, login] = useLoginMutation();

  const handleChange = (e: any): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log(`values`, values);
        const response = await login(values);

        console.log(`response`, response);

        if (response.data?.login?.errors) {
          setErrors(toErrorMap(response.data.login.errors));
        } else {
          router.push("/");
        }
      }}
      className="col-md-6 mx-auto form-group"
    >
      <label htmlFor="username" />
      <input
        id="username"
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        className="form-control"
      />
      {errors.username && <p className="text-danger">{errors.username}</p>}
      <label htmlFor="password" />
      <input
        id="password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        className="form-control"
      />
      {errors.password && <p className="text-danger">{errors.password}</p>}
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-secondary mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
