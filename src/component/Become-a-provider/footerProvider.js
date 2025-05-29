import React, { useState } from "react";
import "../../css/BecomeProvider.css";

const steps = ["Facility", " Add  Services", "Add Courts"];

const FooterProvider = ({ backClick, nextClick, activeStep }) => {
  const handleNext = () => {
    console.log("i am clicked", activeStep);
    //  setActiveStep((prevActiveStep) => prevActiveStep + 1);
    nextClick();
  };

  // const backClick = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };


  
  const handleReset = () => {
    // setActiveStep(0);
  };

  return (
    <div className="container">
      <div className="col-md-12">
        <div className="stepper">
          {steps.map((label, index) => (
            <div
              key={label}
              className={`step ${activeStep === index ? "active" : ""}`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="stepper-actions p-4">
          <button onClick={backClick}>Back</button>
          <button
            onClick={activeStep === steps.length - 1 ? handleReset : handleNext}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterProvider;
