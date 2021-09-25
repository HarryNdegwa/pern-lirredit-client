import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlClient";

const ForgotPassword: NextPage<{ token: string }> = ({ token }) => {
  const [value, setValue] = useState({ email: "" });
  const [error, setError] = useState({ email: "" });
  const btnRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();

  const [, forgotPassword] = useForgotPasswordMutation();

  const handleChange = (e: any): void => {
    setValue({ ...value, [e.target.name]: e.target.value.trim() });
  };

  const redirectToSuccessPage = (e: any): void => {
    e.preventDefault();
    router.replace("/link-sent");
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const response = await forgotPassword(value);

        console.log(`response`, response);

        if (!response.data?.forgotPassword) {
          setError({ email: "User not found" });
        } else {
          if (btnRef && btnRef.current) {
            btnRef.current.click();
          }
        }
      }}
      className="col-md-6 mx-auto form-group"
    >
      <button
        style={{ visibility: "hidden" }}
        onClick={redirectToSuccessPage}
        ref={btnRef}
      ></button>
      <label htmlFor="email">Your Email</label>
      <input
        id="email"
        type="text"
        name="email"
        value={value.email}
        onChange={handleChange}
        className="form-control"
      />
      {error.email && <p className="text-danger">{error.email}</p>}
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-secondary mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

ForgotPassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
