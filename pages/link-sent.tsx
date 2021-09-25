import { withUrqlClient } from "next-urql";

import React from "react";
import { createUrqlClient } from "../utils/createUrlClient";

const EmailSent: React.FC<{}> = ({}) => {
  return (
    <div>
      <div className="col-md-8 mx-auto mt-5">
        <p className="text-success">
          A link has been sent in your inbox to reset your password!
        </p>
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(EmailSent);
