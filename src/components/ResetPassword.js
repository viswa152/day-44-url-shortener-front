import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import baseUrl from "../api/api";

function ResetPassword() {
  let [password, setPassword] = useState("");
  let [cPassword, setcPassword] = useState("");
  let [resetToken, setResetToken] = useState("");

  let { id } = useParams();
  useEffect(() => {
    setResetToken(id);
  }, [id]);

  const handleReset = async (e) => {
    e.preventDefault();

    let users = await baseUrl.get("/users");
    users = users.data;
    users = users.find((user) => user.resetToken === resetToken);
    if (users) {
      if (password === cPassword) {
        baseUrl.patch(`/users/reset-password/${resetToken}`, {
          password: password,
        });
        setPassword("");
        setcPassword("");
        alert("Password changed Successfully!");
      } else {
        alert("Password not matching");
      }
    } else {
      alert("Reset password link has been expired!");
    }
  };

  return (
    <form onSubmit={handleReset}>
      <div className="d-flex justify-content-center h-100">
        <div className="card resetPassword">
          <div className="card-header">
            <h3 className="text-center">Reset Password</h3>
          </div>
          <div className="card-body">
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
            <label className="labels">Confirm Password</label>
            <div className="input-group form-group">
              <input
                type="password"
                className="form-control"
                value={cPassword}
                onChange={(e) => setcPassword(e.target.value)}
                required
              />
            </div>
            <br />
            <br />
            <div className="form-group text-center">
              <input type="submit" value="Reset" className="btn text-wrap" />
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

export default ResetPassword;
