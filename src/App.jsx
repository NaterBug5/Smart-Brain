import "./App.css";

import Navigation from "./components/navigation/navigation-component";
import Logo from "./components/logo/logo-component";
import ImageLinkForm from "./components/image link form/image-link-form-component";
import Rank from "./components/rank/rank-component";
import SignIn from "./components/signin/sign-in-component";
import Register from "./components/register/register-component";

import { useState } from "react";

function App() {
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  });

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onRouteChange = (newRoute) => {
    switch (newRoute) {
      case "home":
        setIsSignedIn(true);
        break;
      case "signout":
        setIsSignedIn(false);
        break;
      default:
        // Keep current isSignedIn state for routes like "signin" or "register"
        break;
    }
    setRoute(newRoute);
  };

  const renderRoute = () => {
    switch (route) {
      case "home":
        return (
          <>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm />
          </>
        );
      case "signin":
        return <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />;
      case "register":
        return <Register onRouteChange={onRouteChange} />;
      default:
        return <SignIn loadUser={loadUser} onRouteChange={onRouteChange} />;
    }
  };

  return (
    <div className="App">
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {renderRoute()}
    </div>
  );
}

export default App;
