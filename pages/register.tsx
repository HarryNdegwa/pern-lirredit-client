import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { authErrors } from "../utils/auth";
import { createUrqlClient } from "../utils/createUrlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  const [errors, setErrors] = useState<authErrors>({
    username: "",
    password: "",
    email: "",
  });
  const router = useRouter();
  const [values, setValues] = useState({
    username: "",
    password: "",
    email: "",
  });
  const handleChange = (e: any): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await register(values);

        if (response.data?.register?.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else {
          router.push("/");
        }
      }}
      className="col-md-6 mx-auto form-group"
    >
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        className="form-control"
      />
      {errors.username && <p className="text-danger">{errors.username}</p>}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        className="form-control"
      />
      {errors.email && <p className="text-danger">{errors.email}</p>}

      <label htmlFor="password">Password</label>

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

export default withUrqlClient(createUrqlClient)(Register);
