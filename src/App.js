import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import baseUrl from "./api/api";
import Sigin from "./components/Sigin";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AccVerification from "./components/AccVerification";
import Dashboard from "./components/Dashboard";
import LogOut from "./components/LogOut";

function App() {
  const [loggedInUser, setLoggedInUser] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUserJson = window.sessionStorage.getItem("loggedInUser");
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      setLoggedInUser(user);
    }
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const userDetails = {
      email,
      password,
    };

    try {
      const response = await baseUrl.post("/users/signin", userDetails);

      const user = response.data;
      window.sessionStorage.setItem("loggedInUser", JSON.stringify(user));
      setLoggedInUser(user.name);
      setEmail("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      alert(`Check your email and password ${error} `);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setLoggedInUser("");
    window.sessionStorage.clear();
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Sigin
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSignIn={handleSignIn}
          />
        }
      />
      <Route path="/sign-up" element={<Signup />} />
      <Route path="users/acc-verification/:id" element={<AccVerification />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="users/reset-password/:id" element={<ResetPassword />} />
      {loggedInUser ? (
        <Route
          path="/dashboard"
          element={<Dashboard handleLogout={handleLogout} />}
        />
      ) : (
        <Route path="/dashboard" element={<LogOut />} />
      )}
    </Routes>
  );
}

export default App;
