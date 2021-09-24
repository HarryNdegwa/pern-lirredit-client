import React, { useState } from "react";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [values, setValues] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(`values`, values);
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
      <label htmlFor="password" />
      <input
        id="password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        className="form-control"
      />
      <div className="d-grid gap-2">
        <button type="submit" className="btn btn-secondary mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Register;
