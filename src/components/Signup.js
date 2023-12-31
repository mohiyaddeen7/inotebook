import notesContext from "../context_useContext/notes/notesContext";
import React, { useContext, useState } from "react";

export default function Signup() {
  const { signup } = useContext(notesContext);

  const [suser, setSuser] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (suser.cpassword === suser.password) {
      signup(suser.fname, suser.email, suser.password);
      setSuser({ fname: "", email: "", password: "", cpassword: "" });
    } else {
      alert("Passwords do not match");
    }
  };

  const onChange = (e) => {
    setSuser({ ...suser, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form className="container my-5 p-16" onSubmit={onSubmit}>
        <div className="heading mb-3 text-xl font-bold">Signup</div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputFname"
            value={suser.fname}
            name="fname"
            onChange={onChange}
            pattern="[A-Za-z]{1,}"
            title="Name should only contain letters"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={suser.email}
            onChange={onChange}
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={suser.password}
            name="password"
            onChange={onChange}
            minLength="5"
            title="Must be atleast 5 characters"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputCpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            value={suser.cpassword}
            name="cpassword"
            onChange={onChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-success text-black hover:!text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
