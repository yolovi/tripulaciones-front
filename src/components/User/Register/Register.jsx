import React, { useState } from "react";
import "./Register.scss";
import { register } from "../../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    surname2: "",
    email: "",
    password: "",
    password2: "",
    occupation: "",
    role: "",
  });

  const {
    name,
    surname,
    surname2,
    email,
    password,
    password2,
    occupation,
    role,
  } = formData;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    return dispatch(register(formData));

    //   if (password !== password2) {
    //     return notification.error({
    //       message: "Error",
    //       description: "Passwords do not match",
    //     });
    //   } else {
    //       return dispatch(register(formData));
    //   }
    // };
  };
  return (
    <>
      <div>Register</div>
      <form onSubmit={onSubmit} className="form-register">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Insert your name"
          onChange={onChange}
        />
        <input
          type="text"
          name="surname"
          value={surname}
          placeholder="Insert your surname"
          onChange={onChange}
        />
        <input
          type="text"
          name="surname2"
          value={surname2}
          placeholder="Insert your surname"
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Insert your email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Insert your password"
          onChange={onChange}
        />
        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="Insert your password2"
          onChange={onChange}
        />
        <input
          type="text"
          name="role"
          value={role}
          placeholder="Insert your role"
          onChange={onChange}
        />
        <input
          type="text"
          name="occupation"
          value={occupation}
          placeholder="Insert your occupation"
          onChange={onChange}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
export default Register;
