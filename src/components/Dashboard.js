import React, { useEffect, useState } from "react";
import baseUrl from "../api/api";

function Dashboard({ handleLogout }) {
  const [count, setCount] = useState("");
  const [shortenUrl, setShortenUrl] = useState([]);
  const [url, setUrl] = useState("");
  const [Click, setClick] = useState(true);

  let jsonData = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const token = jsonData["token"];
  const userName = jsonData["name"];

  useEffect(() => {
    baseUrl
      .get("/user/url", {
        headers: { authorization: `bearer ${token}` },
      })
      .then((res) => {
        setCount(res.data.length);
        setShortenUrl(res.data);
        Click ? setClick(false) : setClick(true);
      });
  }, [Click, token]);

  const handleUrlShortening = async (e) => {
    e.preventDefault();
    const urlData = {
      longURL: url,
    };

    try {
      await baseUrl.post("/user/url", urlData, {
        headers: { authorization: `bearer ${token}` },
      });
      setUrl("");
      Click ? setClick(false) : setClick(true);
      alert("Shortened URL created");
    } catch (error) {
      alert("Internal server error");
    }
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg p-3"
        style={{ backgroundColor: "#1436cc" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand text-light fw-bold">
            <i className="fas fa-link fa-spin" aria-hidden="true"></i>
            &nbsp; URL SHORTENER APP
          </div>
          <div className="navbar-brand text-light fw-bold">
            <i class="fa-solid fa-handshake fa-beat fs-5"></i>
            &nbsp;&nbsp;{" "}
            <span className="fs-6">Welcome Back {userName}...!</span>
          </div>
          <button
            className="nav-link text-light fw-bold"
            onClick={handleLogout}
          >
            LOGOUT &nbsp;
            <i className="fas fa-sign-out" aria-hidden="true"></i>
          </button>
        </div>
      </nav>
      <div className="container-fluid dashboard p-4">
        <div className="container d-flex justify-content-center h-100">
          <form onSubmit={handleUrlShortening}>
            <div className="input-group">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="px-5 rounded"
              />
              <div style={{ marginLeft: "2rem" }}>
                <button className="btn">
                  Shorten URL &nbsp;&nbsp;{" "}
                  <i className="fa-solid fa-arrow-down-wide-short"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          className="container mt-4 min-vh-100 justify-content-center align-items-center"
          style={{ color: "pink" }}
        >
          <div className="container p-3">
            <div className="card p-2 border-dark">
              <div
                className="card-header text-center justify-content-center"
                style={{ backgroundColor: "#1436cc" }}
              >
                <h5 style={{ color: "white" }} className="">
                  Total shortened url created by{" "}
                  <span className="fw-bold">{userName}</span> -{" "}
                  <span className="fw-bolder">{count}</span>
                </h5>
              </div>
            </div>
            {shortenUrl
              .slice(0)
              .reverse()
              .map((url, index) => (
                <div
                  className={"card mt-2 text-center urlDetail border-dark"}
                  key={url._id}
                  style={{ backgroundColor: "white" }}
                >
                  {console.log(shortenUrl.length)}
                  <div className="card-body fs-6">
                    <p>
                      <span className="fw-bold  fs-5" style={{ color: "blue" }}>
                        Long Url -
                      </span>{" "}
                      <a
                        href={url.longURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.longURL}
                      </a>
                    </p>
                    <p>
                      <span className="fw-bold  fs-5" style={{ color: "blue" }}>
                        Short Url -
                      </span>{" "}
                      <a
                        href={url.shortURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.shortURL}
                      </a>
                    </p>
                    <p className="fw-bold">
                      <span className="fs-5" style={{ color: "blue" }}>
                        Short Url Hit Count -
                      </span>{" "}
                      <span className="fs-5">{url.hitCount}</span>
                    </p>
                    <p className="fw-bold">
                      <span className="fs-5" style={{ color: "blue" }}>
                        Created Date -
                      </span>{" "}
                      <span>{url.createdOn.slice(0, 10)}</span>{" "}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
