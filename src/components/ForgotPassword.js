import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../api/api";

function ForgotPassword() {
  let [email, setEmail] = useState("");
  const navigate = useNavigate("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const forgotEmail = email;

    let users = await baseUrl.get("/users");
    users = users.data;
    users = users.find((user) => user.email === forgotEmail);
    if (users) {
      try {
        baseUrl.put("/users/forgot-password", { email: forgotEmail });
        setEmail("");
        alert(
          "Mail has been sent to reset the password.Kindly check your email!"
        );
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("User does not exist. Kindly register!");
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <div className="d-flex justify-content-center h-100 register">
        <div className="card forgot-password">
          <div className="card-header">
            <h3 className="text-center">Forgot Password</h3>
          </div>
          <div className="card-body">
            <label className="labels">Email</label>
            <div className="input-group form-group">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className="form-group text-center">
              <input type="submit" value="Reset" className="btn" />
            </div>
            <br />
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

export default ForgotPassword;
