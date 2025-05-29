import React, { lazy, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Logo from "../../assets/logo.png";

const ProviderWrapper = () => {
    const [payload,setPayload] = useState()

  return (
    <>  <header>
              <nav className="navbar navbar-expand-lg ">
                  <div className="container-fluid mx-auto mx-sm-2 mx-md-4 mx-lg-3 border-bottom">
                      <Link to="/" className="navbar-brand">
                          <img src={Logo} alt="Book Venue" loading={lazy} height="50" />
                      </Link>
                      <div className="action-container me-3">
                          <div
                              className="action"
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
                              <p className="action-text">Save & exit</p>
                          </div>
                      </div>
                  </div>
              </nav>
        </header>
    <Outlet context={[payload,setPayload]}/>
    </>

  )
}

export default ProviderWrapper