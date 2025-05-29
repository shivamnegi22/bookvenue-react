import React from "react";
import BootstrapModal from "../common/bootstrapmodal";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { Toast } from "primereact/toast";
import { ImSpinner7 } from "react-icons/im";
import { MdModeEdit } from "react-icons/md";
import { useContext } from "react";
import { Context as AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

export const Login = () => {
  const navigate = useNavigate();
  const { state, userLoggedIn } = useContext(AuthContext);
  const [otpView, setOtpView] = useState(false);
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const toast = useRef(null);
  const buttonRef = useRef(null);
  const [resendCountdown, setResendCountdown] = useState();
  const [signupMethod, setSignupMethod] = useState("");
  const [showMobileInput, setShowMobileInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);

  const handleSignUpWithEmail = () => {
    setShowMobileInput(false);
    setShowEmailInput(true);
  };
  
  const handleSignUpWithMobile = () => {
    setShowMobileInput(true);
    setShowEmailInput(false);
  };

  const resetLoginState = () => {
    setOtpView(false);
    setMobile("");
    setEmail("");
    setOTP("");
    setResendCountdown(60);
  };

  const handleChange = (e) => {
    if (e.target.id === "mobile" && /^[0-9]{0,10}$/.test(e.target.value)) {
      setMobile(e.target.value);
    }
  
    if (e.target.id === "email"){
      setEmail(e.target.value);
    }
  
    if (e.target.id === "otp" && /^[0-9]{0,6}$/.test(e.target.value)) {
      setOTP(e.target.value);
    }
  };
  

  useEffect(() => {
    resetLoginState();
  }, [state.loginState]);

  useEffect(() => {
    let intervalId;

    if (resendCountdown > 0) {
      intervalId = setInterval(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [resendCountdown]);

  const handleResendOTP = () => {
    if ((mobile !== "" && /^[0-9]{10}$/.test(mobile)) || (email !== "" && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
      if (mobile !== "") {
        sendOTP.mutate({ mobile, url: "/login" }); // Mobile ke liye API call
      } else {
        sendEmailOTP.mutate({ email, url: '/login-via-email' }); // Email ke liye API call
      }
    } else {
      setOtpView(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Invalid Mobile No. or Email`,
        life: 2000,
      });
    }
  };
  
  

  const sendOTP = useMutation(
    ({ url, ...formData }) =>
      fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          throw error;
        }),
    {
      onSuccess: (data) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `${data.message}`,
          life: 2000,
        });
        setOtpView(true);
        setResendCountdown(60);
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `${error.message}`,
          life: 2000,
        });
      },
    }
  );

  const sendEmailOTP = useMutation(
    ({ url, ...formData }) =>
      fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          throw error;
        }),
    {
      onSuccess: (data) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `${data.message}`,
          life: 2000,
        });
        setOtpView(true);
        setResendCountdown(60);
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `${error.message}`,
          life: 2000,
        });
      },
    }
  );
  

  const verifyOTP = useMutation(
    ({ url, ...formData }) =>
      fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          throw error;
        }),
    {
      onSuccess: (data) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `${data.message}`,
          life: 2000,
        });
        if (data) {
          try {
            buttonRef.current.click();
            userLoggedIn({
              token: data.token,
            });
            resetLoginState();
            navigate("/");
          } catch (error) {
            console.log(error, "error while logging in");
            throw new Error("Something went wrong while trying to logging in.");
          }
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: `something went wrong while logging in.`,
            life: 2000,
          });
        }
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `${error.message}`,
          life: 2000,
        });
      },
    }
  );
  const verifyEmailOTP = useMutation(
    ({ url, ...formData }) =>
      fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .catch((error) => {
          throw error;
        }),
    {
      onSuccess: (data) => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: `${data.message}`,
          life: 2000,
        });
        if (data) {
          try {
            buttonRef.current.click();
            userLoggedIn({
              token: data.token,
            });
            resetLoginState();
            navigate("/");
          } catch (error) {
            console.log(error, "error while logging in");
            throw new Error("Something went wrong while trying to log-in.");
          }
        } else {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: `something went wrong while logging in.`,
            life: 2000,
          });
        }
      },
      onError: (error) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `${error.message}`,
          life: 2000,
        });
      },
    }
  );
  

  const handleLogin = () => {
    if ((mobile !== "" && /^[0-9]{10}$/.test(mobile)) || (email !== "" && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
      if (mobile !== "") {
        sendOTP.mutate({ mobile, url: "/login" }); 
      } else {
        sendEmailOTP.mutate({ email, url:'/login-via-email'}); 
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Invalid Mobile No. or Email`,
        life: 2000,
      });
    }
  };

  const handleOTP = () => {
    if ((mobile !== "" && /^[0-9]{10}$/.test(mobile)) || (email !== "" && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
      if (OTP !== "" && /^[0-9]{6}$/.test(OTP)) {
        if (mobile !== "") {
          verifyOTP.mutate({
            mobile: mobile,
            otp: OTP,
            url: "/verify-otp",
          });
        } else {
          verifyEmailOTP.mutate({
            email: email,
            otp: OTP,
            url: '/verify-otp-via-email',
          });
        }
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: `Invalid OTP.`,
          life: 2000,
        });
      }
    } else {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: `Invalid Mobile No. or Email`,
        life: 2000,
      });
    }
  };
  

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <button
        ref={buttonRef}
        type="button"
        className="btn d-none"
        data-bs-dismiss="modal"
        data-bs-target="#loginModal"
        aria-label="Close"
      ></button>
      <BootstrapModal
        modalId="loginModal"
        centered
        className="login-modal-container"
      >
         <div className="modal-wrapper-login p-5 text-center">
  <div className="px-5">
    <h4 className="login-modal-heading">Login/Signup to Bookvenue</h4>
    <p className="login-modal-info mb-4">Please enter your mobile number or email</p>
    <button
      type="button"
      className="btn btn-primary w-100 login-modal-button my-2"
      onClick={handleSignUpWithEmail}
      disabled={sendEmailOTP.isLoading || showEmailInput}
    >
      {sendEmailOTP.isLoading ? (
        <>
         Sign up with Email
        </>
      ) : (
        " Sign up with Email"
      )}
    </button>
    <button
      type="button"
      className="btn btn-primary w-100 login-modal-button my-2"
      onClick={handleSignUpWithMobile}
      disabled={sendOTP.isLoading || showMobileInput}
    >
      {sendOTP.isLoading ? (
        <>
        Sign up with Mobile
        </>
      ) : (
        " Sign up with Mobile"
      )}
    </button>
     
    {showEmailInput && (
      <div className="input-group mb-3 login-modal-inputGroup">
        <span className="input-group-text" id="emailId">
          @
        </span>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => handleChange(e)}
          className="form-control"
          placeholder="Email Address"
          aria-label="Email Address"
          aria-describedby="emailId"
        />
      </div>
    )}
    {showMobileInput && (
      <div className="input-group mb-3 login-modal-inputGroup">
        <span className="input-group-text" id="mobileNo">
          +91
        </span>
        <input
          id="mobile"
          type="text"
          value={mobile}
          onChange={(e) => handleChange(e)}
          className="form-control"
          placeholder="Mobile Number"
          aria-label="Mobile Number"
          aria-describedby="mobileNo"
        />
      </div>
    )}
    {(showEmailInput || showMobileInput) && (email || mobile) && (
      <button
        type="button"
        className="btn btn-primary w-100 login-modal-button"
        onClick={() => handleLogin()}
        disabled={sendOTP.isLoading || sendEmailOTP.isLoading}
      >
        {sendOTP.isLoading || sendEmailOTP.isLoading ? (
          <>
            Get OTP
            <ImSpinner7 className="pi-spin ms-2" />
          </>
        ) : (
          "Continue"
        )}
      </button>
    )}
    {otpView && 
        <div className="input-group login-modal-inputGroup mb-4 my-3">
        <input
          id="otp"
          type="text"
          value={OTP}
          onChange={(e) => handleChange(e)}
          className="form-control"
          placeholder="Enter OTP"
          aria-label="Enter OTP"
          aria-describedby="otp"
        />
                  <button
                    type="button"
                    className="btn btn-primary w-100 login-modal-button my-3"
                    onClick={() => handleOTP()}
                    disabled={verifyOTP.isLoading ? true : false}
                  >
                    {verifyOTP.isLoading ? (
                      <>
                        Submit
                        <ImSpinner7 className="pi-spin ms-2" />
                      </>
                    ) : (
                      "Submit"
                    )}
                  </button>
        {resendCountdown > 0 ? (
      <div className="mt-2 mb-3 w-100 text-start">
        <span className="desc-text me-2">
          Resend OTP in {resendCountdown} seconds
        </span>
      </div>
    ) : (
      <span
        className="primary-hover-text cursor-pointer mt-2 mb-3 d-flex w-fit"
        onClick={() => handleResendOTP()}
      >
        Resend OTP
      </span>
    )}
      </div>}

  </div>
</div>


      </BootstrapModal>
    </>
  );
};