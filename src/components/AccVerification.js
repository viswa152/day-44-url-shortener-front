import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import baseUrl from "../api/api";

function AccVerification() {
  let [resetToken, setResetToken] = useState("");
  const navigate = useNavigate();

  let { id } = useParams();
  useEffect(() => {
    setResetToken(id);
  }, [id]);

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      let users = await baseUrl.get("/users");
      users = users.data;
      users = users.find((user) => user.resetToken === resetToken);
      if (users) {
        baseUrl.patch(`/users/acc-verification/${resetToken}`);
        alert("Account has been verified Successfully");
        navigate("/");
      } else {
        alert("Account verification link expired.!");
      }
    } catch (error) {
      alert("Internal server error");
    }
  };

  return (
    <form onSubmit={handleVerification}>
      <div className="d-flex justify-content-center h-100">
        <div className="card register mt-5">
          <div className="card-header">
            <h3 className="text-center">Account verification</h3>
          </div>
          <div className="card-body text-center">
            <button className="btn btn-block">Click to verify</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default AccVerification;
