import React from "react";
import "./sign-in-styles.css";
import { useState } from "react";

const SignIn = ({ onRouteChange, loadUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch("https://smart-brain-bdmg.onrender.com/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((user) => {
        if (user.id) {
          onRouteChange("home");
          loadUser(user);
        } else {
          window.alert("Username and/or password is invalid");
        }
      })
      .catch((err) => {
        console.error("Sign-in error:", err);
      });
  };

  return (
    <>
      <div className="sign-in-wrapper">
        <div className="sign-in-form-wrapper">
          <h1>Sign In:</h1> <hr></hr>
          <h3>Email:</h3>
          <input onChange={onEmailChange} type="text" />
          <h3>Password:</h3>
          <input onChange={onPasswordChange} type="password" />
          <button
            className="sign-in-button"
            onClick={() => {
              onSubmitSignIn();
            }}
          >
            Sign In
          </button>
          <p onClick={() => onRouteChange("register")}>Register</p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
