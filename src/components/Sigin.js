import React from "react";
import { Link } from "react-router-dom";

function Sigin({ email, setEmail, password, setPassword, handleSignIn }) {
  return (
    <>
      <form onSubmit={handleSignIn}>
        <div className="heading">
          <h1 className="text-center text-white fw-bold" style={{ color: "#1436cc" }}>
            <i className="fas fa-link fa-spin" aria-hidden="true"></i>&nbsp; URL
            Shortener Application
          </h1>
        </div>
        <div className="d-flex justify-content-center h-100 register">
          <div className="card signin">
            <div className="card-header">
              <h3 className="text-center">Sign In</h3>
            </div>
            <div className="card-body">
              <label className="labels">Email</label>
              <div className="input-group form-group">
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                />
              </div>
              <br />
              <div className="form-group text-center">
                <input
                  type="submit"
                  value="Login"
                  className="btn login_btn btn-block"
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<Link to="/sign-up">Sign Up</Link>
              </div>
              <div className="d-flex justify-content-center links">
                <Link to="/forgot-password">Forgot your password?</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      <br />
      <div className="container justify-content-center text-white d-flex">
        <div className="card">
          <div className="card-body text-center">
            <p className="fw-bold">Sample Credentials</p>
            <p>You can create your own account too by registering here!</p>
            <p>Credentials : hemskamaraj@gmail.com - hema</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sigin;
