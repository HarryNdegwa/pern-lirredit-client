import { withUrqlClient } from "next-urql";
import React from "react";
import Navbar from "../components/Navbar";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrlClient";

const Home = () => {
  const [{ data }] = usePostsQuery();
  return (
    <>
      <Navbar />
      <div>
        <h3>Helloo World</h3>
        {!data ? (
          <div>Loading...</div>
        ) : (
          data.posts.map((p) => <p key={p.id}>{p.title}</p>)
        )}
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
