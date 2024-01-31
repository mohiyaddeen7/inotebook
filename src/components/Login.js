import { NavLink } from "react-router-dom";
import notesContext from "../context_useContext/notes/notesContext";
import React, { useContext, useState } from "react";

export default function Login() {
  const { login } = useContext(notesContext);

  const [luser, setLuser] = useState({ email: "", password: "" });
  const onSubmit = (e) => {
    e.preventDefault();
    login(luser.email, luser.password);
    setLuser({ email: "", password: "" });
  };

  const onChange = (e) => {
    setLuser({ ...luser, [e.target.name]: e.target.value });
  };
  try {
    return (
      <div className="w-full">
        <form
          className="container my-5 p-16 md:w-1/4 w-full flex items-center flex-col"
          onSubmit={onSubmit}
        >
          <div className="heading mb-3 text-xl font-bold ">Login</div>
          <div className="mb-3 w-full">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={luser.email}
              onChange={onChange}
              name="email"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3 w-full">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={luser.password}
              name="password"
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-success text-black hover:!text-white"
          >
            Submit
          </button>
          <div className="mt-4">
            Don't have an account?{" "}
            <NavLink to={"/signup"} className="text-green-400 underline">
              SignUp
            </NavLink>
          </div>
        </form>
      </div>
    );
  } catch (error) {
    alert("Internal server error");
  }
}
