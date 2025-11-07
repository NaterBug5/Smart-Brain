import React from "react";
import "./navigation.styles.css";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn === true) {
    return (
      <p onClick={() => onRouteChange("signout")} className="signOut">
        Sign Out
      </p>
    );
  } else {
    return (
      <>
        <nav>
          <p onClick={() => onRouteChange("signin")} className="signOut">
            Sign In
          </p>
          <p onClick={() => onRouteChange("register")} className="signOut">
            Register
          </p>
        </nav>
      </>
    );
  }
};

export default Navigation;
