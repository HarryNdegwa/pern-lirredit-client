import React, { useState } from "react";
import { useMutation } from "urql";

interface registerProps {}

const REGISTER_MUT = `
mutation Register($username:String!,$password:String!){
    register(options:{username:$username,password:$password}){
      errors{
        field
        message
      }
      user{
        id
        username
      }
    }
  }
  `;

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUT);

  const [values, setValues] = useState({ username: "", password: "" });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log(`values`, values);
        register(values);
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
