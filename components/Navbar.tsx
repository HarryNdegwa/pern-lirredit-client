import React from "react";
import Link from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

const Navbar: React.FC<{}> = ({}) => {
  const [{ fetching, data }] = useMeQuery({
    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  console.log(`data`, data);

  let body;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <>
        <div className="mx-3">
          <Link href="/register">Register</Link>
        </div>
        <div>
          <Link href="/login">Login</Link>
        </div>
      </>
    );
  } else {
    body = (
      <>
        <div className="mx-3">
          <p className="m-0">{data.me.username}</p>
        </div>
        <div>
          <button
            className="btn btn-success"
            onClick={() => {
              logout();
            }}
            disabled={logoutFetching}
          >
            Logout
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="bg-danger py-3">
      <div className="col-md-8 mx-auto d-flex justify-content-end">{body}</div>
    </div>
  );
};

export default Navbar;
