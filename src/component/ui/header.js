import React, { lazy, useContext, useEffect } from "react";
import "../../css/header.css";
import Logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";
import SearchLocation from "../common/searchLocation";

export const Header = () => {
  const navigate = useNavigate();
  const { state, resetLoginState, logout } = useContext(AuthContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid mx-auto mx-sm-2 mx-md-4 mx-lg-3 border-bottom">
          <Link to="/" className="navbar-brand">
            <img src={Logo} alt="Book Venue" loading={lazy} height="50" />
          </Link>

          <SearchLocation className="w-50" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <div className="d-flex justify-content-between my-2 my-lg-0">
              <div className="action-container">
                <Link to="/become-a-provider">
                  {/* Calender foor booking svg */}
                  <svg
                    className="action-icon"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 1C6.477 1 2 5.477 2 11c0 2.245.745 4.32 2 6L1 22l6-2c1.68 1.257 3.754 2 6 2 5.523 0 10-4.477 10-10S17.523 1 12 1zm-1 16v-4H7v-2h4V7h2v4h4v2h-4v4h-2z"
                      fill="#00BFB4"
                    />
                  </svg>

                  {/* Calender foor booking svg end */}

                  <p className="action-text " style={{ color: "black" }}>
                    Join us
                  </p>
                </Link>

                <div className="vr mx-2 mx-xl-3"></div>
              </div>
              {state.userData &&
              <div className="action-container">
              <div
                      className="action"
                      onClick={() => {
                        navigate("/user/bookings");
                      }}
                    >
                {/* Calender foor booking svg */}
                <svg
                  className="action-icon"
                  width="24"
                  height="26"
                  viewBox="0 0 24 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.2 2.91935V0.5H17.6V2.91935H6.4V0.5H4.8V2.91935H0V25.5H24V2.91935H19.2ZM1.6 4.53226H4.8V6.95161H6.4V4.53226H17.6V6.95161H19.2V4.53226H22.4V10.9839H1.6V4.53226ZM22.4 23.8871H1.6V12.5968H22.4V23.8871Z"
                    fill="#00BFB4"
                  />
                </svg>
                {/* Calender foor booking svg end */}
                <p className="action-text">Booking</p>
                <div className="vr mx-2 mx-xl-3"></div>
                    </div>
              </div>
              }
              {!state.userData ? (
                <>
                  <div className="action-container">
                    <div
                      className="action"
                      data-bs-toggle="modal"
                      data-bs-target="#loginModal"
                      onClick={() => {
                        resetLoginState(!state.loginState);
                      }}
                    >
                      <svg
                        className="action-icon"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_118_191)">
                          <path
                            d="M20.625 6.5625H26.25"
                            stroke="#00BFB4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M23.4375 3.75V9.375"
                            stroke="#00BFB4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5 23.9998C6.01386 22.2418 7.47168 20.782 9.22701 19.7671C10.9823 18.7522 12.9734 18.2179 15.0001 18.2179C17.0268 18.2179 19.0178 18.7523 20.7731 19.7672C22.5284 20.7821 23.9862 22.242 25 24M21.1901 13.8997C20.7491 15.0925 19.9737 16.1323 18.9571 16.8944C17.9405 17.6564 16.7258 18.1082 15.4591 18.1954C14.1924 18.2827 12.9275 18.0017 11.8164 17.3862C10.7052 16.7708 9.79503 15.847 9.19523 14.7259C8.59543 13.6048 8.33149 12.3341 8.43512 11.0664C8.53875 9.79864 9.00555 8.58784 9.77943 7.57944C10.5533 6.57105 11.6014 5.80793 12.7977 5.38177C13.994 4.95561 15.2877 4.88454 16.5233 5.17708"
                            stroke="#00BFB4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_118_191">
                            <rect width="30" height="30" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {/* login svg end */}
                      <p className="action-text">Login / Signup</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="action-container">
                    <div
                      className="action"
                      onClick={() => {
                        navigate("/user/profile");
                      }}
                    >
                      {/* login svg */}
                      <svg
                        className="action-icon"
                        width="22"
                        height="21"
                        viewBox="0 0 22 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 19.9998C2.01386 18.2418 3.47168 16.782 5.22701 15.7671C6.98233 14.7522 8.97336 14.2179 11.0001 14.2179C13.0268 14.2179 15.0178 14.7523 16.7731 15.7672C18.5284 16.7821 19.9862 18.242 21 20M17.1901 9.89966C16.7491 11.0925 15.9737 12.1323 14.9571 12.8944C13.9405 13.6564 12.7258 14.1082 11.4591 14.1954C10.1924 14.2827 8.92752 14.0017 7.81636 13.3862C6.70519 12.7708 5.79504 11.847 5.19523 10.7259C4.59543 9.60483 4.33149 8.33409 4.43512 7.06636C4.53875 5.79864 5.00555 4.58784 5.77943 3.57944C6.55331 2.57105 7.60136 1.80793 8.79768 1.38177C9.99399 0.955611 11.2877 0.884536 12.5233 1.17708C14.5 1.38177 18.9421 4.6194 17.1901 9.89966Z"
                          stroke="#00BFB4"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      {/* login svg end */}
                       <p className="action-text">Profile</p>
                    </div>

                    <div className="vr mx-2 mx-xl-3"></div>
                  </div>

                  <div className="action-container">
                    <div className="action" onClick={() => handleLogout()}>
                      {/* sign up svg */}
                      <svg
                        className="action-icon"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.33067 15.8503L6.89158 20.6519C7.33247 21.116 8.06221 21.116 8.5031 20.6519C8.94399 20.1877 8.94399 19.4195 8.5031 18.9553L5.88818 16.2024L19.8598 16.2024C20.4831 16.2024 21 15.6582 21 15.002C21 14.3458 20.4831 13.8016 19.8598 13.8016L5.88818 13.8016L8.5031 11.0487C8.94399 10.5845 8.94399 9.81627 8.5031 9.35212C8.27505 9.11204 7.9862 9 7.69734 9C7.40848 9 7.11962 9.11204 6.89158 9.35212L2.33066 14.1537C1.88978 14.6179 1.88978 15.3861 2.33067 15.8503Z"
                          fill="#00BFB4"
                        />
                        <path
                          d="M23.7692 2H19.1538C18.5231 2 18 2.50514 18 3.11429C18 3.72343 18.5231 4.22857 19.1538 4.22857H23.7692C24.8308 4.22857 25.6923 5.06057 25.6923 6.08571V23.9143C25.6923 24.9394 24.8308 25.7714 23.7692 25.7714H19.1538C18.5231 25.7714 18 26.2766 18 26.8857C18 27.4949 18.5231 28 19.1538 28H23.7692C26.1077 28 28 26.1726 28 23.9143V6.08571C28 3.82743 26.1077 2 23.7692 2Z"
                          fill="#00BFB4"
                        />
                      </svg>

                      {/* sign up svg end */}
                      <p className="action-text">Logout</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
