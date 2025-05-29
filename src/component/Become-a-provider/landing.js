import React from "react";
import "../../css/BecomeProvider.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="venu-provider">
        <div className="container">
          <div className="row ">
            <div className="col-md-6">
              <div className="venu-landing">
                <h1>It’s easy to get started on Bookvenu</h1>
              </div>
            </div>
            <div className="col-md-6">
              <div className="venu-landing-page">
                <div className="venu-step-heading">
                  <h3>1. Tell us about your place</h3>
                  <span>
                    Share some basic info, such as where it is and how many
                    guests can stay.
                  </span>
                </div>
                <div className="venu-step-heading">
                  <h3>2. Make it stand out</h3>
                  <span>
                    Add 5 or more photos plus a title and description – we’ll
                    help you out.
                  </span>
                </div>
                <div className="venu-step-heading">
                  <h3>3. Finish up and publish</h3>
                  <span>
                    Share some basic info, such as where it is and how many
                    guests can stay.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="provider-footer">
          <div className="footer-line"></div>
          <div className="get-started-div pe-5">
            <div className="my-componenet-button">
              <button
                className="get-started-button"
                type="button"
                onClick={() => navigate("/become-a-provider/add-facility")}
              >
                Get Started
              </button>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};

export default Landing;
