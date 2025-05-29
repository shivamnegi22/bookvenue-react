import React, { lazy, useContext } from "react";
import "../../css/footer.css";
import Logo from "../../assets/logo.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaTwitter } from 'react-icons/fa';
import { BiLogoLinkedin } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Context as AuthContext } from "../../context/AuthContext";

export const Footer = () => {
  const { state, resetLoginState } = useContext(AuthContext);

  return (
    <footer className="bg-dark py-5">
      <div className="container footer-container">
        <div className="row py-3">
          <div className="col-md-12">
            <div className="footer-upper-wrapper">
              <div className="">
                <div className="footer-logo">
                  <img src={Logo} alt="Book Venue" loading={lazy} height="50" />
                </div>
              </div>
              <div className=" d-flex align-items-center justify-content-center">
                <div className="footer-links-wrapper">
                  <ul className="footer-links-list">
                    <li className="footer-link">
                      <Link to="/" className="footer-link-text">
                        Home
                      </Link>
                    </li>
                    <li className="footer-link">
                      <Link to="/about-us" className="footer-link-text">
                        About us
                      </Link>
                    </li>
                    <li className="footer-link">
                      <Link to="/contact-us" className="footer-link-text">
                        Contact us
                      </Link>
                    </li>
                    {!state.userData ? (
                      <>
                        <li className="footer-link">
                          <button
                            className="btn footer-link-text p-0 border-0"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#loginModal"
                            onClick={() => {
                              resetLoginState(!state.loginState);
                            }}
                          >
                            Login / Signup
                          </button>
                        </li>
                        {/* <li className='footer-link'>
                  <a className='footer-link-text' href=''>Signup</a>
                </li> */}
                      </>
                    ) : null}
                  </ul>
                </div>
              </div>
              <div className=" d-flex justify-content-end align-items-center">
                <div className="footer-social-icons">
                <a href="https://www.facebook.com/people/Book-Venue/61558611844149/" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
  <FaFacebookF />
</a>
                  <a href="https://www.instagram.com/bookvenueapp/" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
  <FaInstagram  />
</a>

                  <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fbookvenueapp" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
  <FaTwitter />
</a>
                  <a href="https://www.linkedin.com/company/101996806/admin/feed/posts/
" target="_blank" rel="noopener noreferrer" className="footer-social-icon">
  <BiLogoLinkedin />
</a>

                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="footer-seprator" />
        <div className="row footer-bottom">
          <div className="col-md-12">
            <div className="footer-bottom-wrapper">
              <div className="">
                <a href="/faq" className="footer-bottom-text">
                  FAQs
                </a>
              </div>
              <div className="">
                <a href="/privacy-policy" className="footer-bottom-text">
                  Privacy Policy
                </a>
              </div>
              <div className="">
                <a
                  href="/terms"
                  className="footer-bottom-text justify-content-center"
                >
                  Terms of Service
                </a>
              </div>
              <div className="">
                <a href="/return-refund" className="footer-bottom-text">
                  Cancellation Policy
                </a>
              </div>
              <div className="">
                <p className="footer-bottom-text m-0">
                  © 2023 Booknow Services Private Limited. All Rights Reserved.
                </p>
              </div>
              <div className="">
                <p className="footer-bottom-text m-0 justify-content-end">
                  Designed & Developed by{" "}
                  <a className="btn" href="https://giksindia.com/">
                    GIKS India Pvt LTD
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
