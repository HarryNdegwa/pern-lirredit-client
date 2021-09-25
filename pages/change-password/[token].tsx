import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/dist/client/router";
import React, { useRef, useState } from "react";
import { useChangePasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrlClient";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [value, setValue] = useState({ password: "" });
  const [error, setError] = useState({ password: "" });
  const btnRef = useRef<HTMLButtonElement>(null);

  const [, changePassword] = useChangePasswordMutation();

  const router = useRouter();

  const handleChange = (e: any): void => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const redirectToPage = (e: any): void => {
    e.preventDefault();
    router.replace("/");
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        let payload: { password: string; token: string } = { ...value, token };

        const response = await changePassword(payload);

        if (response.data?.changePassword?.errors) {
          setError({ password: "Token expired" });
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
        onClick={redirectToPage}
        ref={btnRef}
      ></button>
      <label htmlFor="password">New Password</label>
      <input
        id="password"
        type="text"
        name="password"
        value={value.password}
        onChange={handleChange}
        className="form-control"
      />
      {error.password && <p className="text-danger">{error.password}</p>}
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-secondary mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient)(ChangePassword);
