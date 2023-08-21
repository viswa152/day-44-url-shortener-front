import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../api/api";

function Signup() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();

    const userDetails = {
      name,
      email,
      password,
    };

    let users = await baseUrl.get("/users");
    users = users.data;
    users = users.find((user) => user.email === userDetails.email);
    if (!users) {
      try {
        await baseUrl.post("/users/signup", userDetails);
        alert("Account registered successfully.Kindly Verify your account");
      } catch (error) {
        console.error("Error Signing Up", error);
      }
      setName("");
      setEmail("");
      setPassword("");
      navigate("/");
    } else {
      alert("User Email already exists");
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="d-flex justify-content-center h-100 register">
        <div className="card signup">
          <div className="card-header">
            <h3 className="text-center">Sign Up</h3>
          </div>
          <div className="card-body">
            <label className="labels">Email</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br />
            <label className="labels">Name</label>
            <div className="input-group form-group">
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <br />
            <label className="labels">Password</label>
            <div className="input-group form-group">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <br />
            <div className="form-group text-center">
              <input type="submit" value="Sign Up" className="btn" />
            </div>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-center links">
              Already Registered?<Link to="/">Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Signup;
