import React from "react";
import "../../../css/AboutusPage.css";
import img from "../../../image/image 1.png";
import imgse from "../../../image/image 2.png";
import { Default } from "../../layouts/default";

function AboutusPage() {
  return (
    <>
      <Default>
        <section className="about-usPage">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="user-about">
                  <h1 className="about-us-heading">About us</h1>
                  <p className="about-us-para">
                    Book venu is the best venu provider
                  </p>
                  <p className="about-us-mainpra">
                    Lorem ipsum dolor sit amet consectetur. Id metus praesent
                    amet aliquet lorem. Ut pulvinar id sollicitudin ullamcorper.
                    Vel molestie ipsum eget nisi. Sem ac mattis vel malesuada
                    elementum neque.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="about-img">
                  <img src={img}></img>
                  <img src={imgse}></img>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="fact-area">
          <div className="container">
            <div className="fact-box">
              <div className="row align-item-center">
                <div className="col-md-3 single-fact">
                  <h2 className="venu">2 M +</h2>
                  <p className="venu-para">User</p>
                </div>
                <div className="col-md-3 single-fact">
                  <h2 className="venu">54 +</h2>
                  <p className="venu-para">Venus</p>
                </div>
                <div className="col-md-3 single-fact">
                  <h2 className="venu">2 M +</h2>
                  <p className="venu-para">Sports Activities Enabled</p>
                </div>
                <div className="col-md-3 single-fact-last">
                  <h2 className="venu">4 M +</h2>
                  <p className="venu-para">Player Connection Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-usContent">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="usContent mb-5">Our Story</h2>
                <p className="usContent-para">
                  Welcome to Book Venue App, your premier destination for
                  discovering and booking sports venues around the globe.
                  Whether you're an avid athlete, a weekend warrior, or a team
                  manager, our platform is designed to simplify the process of
                  finding and securing the perfect venue for your sporting
                  activities.
                </p>
                <p className="usContent-para">
                  At Book Venue App, we understand the importance of
                  convenience, reliability, and security when it comes to
                  booking sports facilities. That's why we've created a
                  user-friendly online platform that allows you to browse
                  through a wide selection of venues, ranging from
                  state-of-the-art stadiums to local community fields, all from
                  the comfort of your own home or on the go.
                </p>
                <p className="usContent-para">
                  With just a few clicks, you can explore detailed profiles of
                  each venue, including photos, amenities, availability, and
                  pricing information. Whether you're looking for a soccer
                  field, a basketball court, a tennis court, or something else
                  entirely, our comprehensive database has you covered.
                </p>
                <p className="usContent-para">
                  But we're more than just a booking platform. We're committed
                  to providing an unparalleled customer experience every step of
                  the way. Our secure payment network ensures that your
                  transactions are safe and reliable, giving you peace of mind
                  as you finalize your booking. And if you ever need assistance
                  or have questions, our dedicated customer support team is here
                  to help.
                </p>
                <p className="usContent-para">
                  Whether you're planning a casual game with friends, organizing
                  a competitive tournament, or training for your next big event,
                  Book Venue App is your trusted partner for all your sports
                  venue needs. Join our community today and discover a world of
                  possibilities for your athletic endeavors.
                </p>
              </div>
            </div>
          </div>
        </section>
      </Default>
    </>
  );
}

export default AboutusPage;
