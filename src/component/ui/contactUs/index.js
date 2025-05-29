import React from "react";
import "../../../css/ContactusPage.css";
import { useForm } from "react-hook-form";
import { IoLocationSharp } from "react-icons/io5";
import { LuPhone } from "react-icons/lu";
import { Default } from "../../layouts/default";
import { axiosAuth } from '../../../utils/axiosInstance';

const ContactusPage = () => {
  const {
    register,
    handleSubmit, reset ,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payLoad = {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        message: data.message, 
      }; 
      try {
        const response = await axiosAuth.post("/contact-us", payLoad);
        if (response.statusText == "OK") {
          reset();
        //   Toast.success("Your Query Sumbitted Successfully", { autoClose: 3000 });
        }
      } catch (error) {
        console.log(error);
      }   
    };
  return (
    <>
      <Default>
        <section className="contact-us">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="contactus-getouch">
                  <h1 className="contact-heading">Get in touch</h1>

                  <div className="usr-contact-us">
                    <span>
                      <IoLocationSharp />
                    </span>
                    <p className="contact-para">Address</p>
                  </div>

                  <p>
                    {" "}
                    Lorem ipsum dolor sit amet consectetur. Id metus praesent
                    amet aliquet lorem. Ut pulvinar id sollicitudin ullamcorper.
                    Vel molestie ipsum eget nisi. Sem ac mattis vel malesuada
                    elementum neque.
                  </p>

                  <div className="usr-contact-us">
                    <p className="contact-para">
                      <span>
                        <LuPhone />{" "}
                      </span>
                      Phone: +91 9565352500
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <form
                  className="contact-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-field w-100">
                    <label htmlFor="name">
                      {" "}
                      Name <span className="required-asterisk">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="error-message">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="form-field w-100">
                    <label htmlFor="email">
                      Email <span className="required-asterisk">*</span>
                    </label>

                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <p className="error-message">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="form-field w-100">
                    <label htmlFor="mobile" className="d-block mb-1">
                      Mobile Number <span className="required-asterisk">*</span>
                    </label>

                    <input
                      type="number"
                      placeholder="Enter your Number"
                      {...register("mobile", {
                        required: "Mobile number is required",
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Please enter a valid mobile number",
                        },
                      })}
                      className="w-100"
                      id="mobile"
                    />
                    {errors.mobile && (
                      <p className="error-message">{errors.mobile.message}</p>
                    )}
                  </div>

                  <div className="form-field w-100">
                    <label htmlFor="message">
                      Message <span className="required-asterisk">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      {...register("message", { required: "Message is required" })}
                    ></textarea>
                    {errors.message && (
                      <p className="error-message">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    className="formButton submit"
                    type="submit"
                    name="submit"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Default>
    </>
  );
};

export default ContactusPage;
