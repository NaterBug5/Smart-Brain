import React from "react";
import "./register-styles.css";
import { useState } from "react";

const Register = ({ onRouteChange }) => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const onEmailChange = (event) => {
    setRegisterEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setRegisterPassword(event.target.value);
  };

  const onNameChage = (event) => {
    setRegisterName(event.target.value);
  };

  const loadUser = () => {
    setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined,
    });
  };

  const onSubmitSignIn = () => {
    fetch("https://smart-brain-bdmg.onrender.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: registerEmail,
        password: registerPassword,
        name: registerName,
      }),
    })
      .then((response) => response.json())
      .then((userData) => {
        if (userData) {
          onRouteChange("signin");
          loadUser();
        } else {
          window.alert("Username and/or password is invalid");
        }
      });
  };

  return (
    <>
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Register Your Account</h1> <hr></hr>
          <h3>Name:</h3>
          <input type="text" onChange={onNameChage} />
          <h3>Email:</h3>
          <input type="email" onChange={onEmailChange} />
          <h3>Password:</h3>
          <input type="password" onChange={onPasswordChange} />
          <button onClick={onSubmitSignIn}>Register</button>
        </div>
      </div>
    </>
  );
};

export default Register;
