import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../css/BecomeProvider.css";
import DatePicker from "react-multi-date-picker";
import FooterProvider from "./footerProvider";
import { useLoaderData } from "react-router-dom";
import { axiosAuth } from "../../utils/axiosInstance";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const AddYourServices = () => {
  const { facility } = useLoaderData();
  const [currentFacility, setCurrentFacility] = useState();
  const [currentService, setCurrentService] = useState();
  const [allServices, setAllServices] = useState();
  const [featuredImage, setfeaturedImages] = useState();
  const [otherImages, setOtherImages] = useState([]);
  const [activeStep, setActiveStep] = useState(1)

  // console.log(allServices, "facilityname is this")
  const navigate = useNavigate();

  const handleFacilityChange = (facilityId) => {
    setCurrentFacility(facilityId);
    getServiceUsingFicilityId(facilityId);
  };

  const getServiceUsingFicilityId = async (id) => {
    try {
      const response = await axiosAuth.get(
        `${BASE_URL}/get-service-by-id/${id}`
      );
      if (response) {
        setAllServices(response.data?.services);
      }
    } catch (error) {
      console.log(error, "check");
    }
  };

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();


  const handleFormSubmit = async (data) => {
    let holidaysCopy = [...data.holidays];
    data["holidays"] = holidaysCopy.map(
      (item) =>
        `${item.day < 10 ? "0" : ""}${item.day}-${item.month < 10 ? "0" : ""}${
          item.month
        }-${item.year}`
    );


    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key == "featuredImage") {
        formData.append(key, featuredImage);
      } else if (key == "otherImages") {
        for (let item of data.otherImages) {
          formData.append("ohterImages", item);
        }
      } else {
        formData.append(key, data[key]);
      }
    });
    const response = await axiosAuth.post(`${BASE_URL}/add-service`, formData);
    if (response) {
      navigate(
        `/become-a-provider/add-courts/${response?.data.facility_service_id}`
      );
      // console.log(response.data.facility_service_id,"check the response")
    }
  };

  return (
    <>
      <section className="add-service-area">
        <div className="container">
          <div className="row ">
            <div className="col-md-12">
              <h1 className="common-form-heading">Add Service</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Choose Facility</label>
                      <select
                        name="facility_id"
                        className="form-select"
                        {...register("facility_id")}
                        onChange={(e) => handleFacilityChange(e.target.value)}
                        required
                      >
                        <option hidden>Choose Facility</option>
                        {facility &&
                          facility.length > 0 &&
                          facility.map((facility, index) => {
                            return (
                              <option key={index} value={facility.id}>
                                {facility.official_name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Choose Services</label>
                      <select
                        name="services_id"
                        className="form-select"
                        {...register("services_id")}
                        onChange={(e) => handleFacilityChange(e.target.value)}
                        required
                      >
                        <option hidden>Choose Services</option>
                        {allServices &&
                          allServices.length > 0 &&
                          allServices.map((service, index) => {
                            return (
                              <option key={index} value={service.id}>
                                {service.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>

                  <>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Holidays</label>
                        <div className="custom-date-picker">
                          <Controller
                            name="holidays"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                              <DatePicker
                                {...field}
                                format="DD-MM-YYYY"
                                placeholder="DD-MM-YYYY"
                                clear
                                minDate={new Date()}
                                // multiple
                                className="form-control"
                                // required
                              />
                            )}
                          />
                        </div>
                        {errors.holidays && (
                          <span className="text-danger">
                            {errors.holidays.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="mb-3">
                        <div>
                          <label
                            htmlFor="description"
                            className="d-block form-label"
                          >
                            Description:
                          </label>
                          <Controller
                            name="description"
                            defaultValue=""
                            control={control}
                            type="text"
                            render={({ field }) => (
                              <textarea
                                className="w-100 form-control"
                                {...field}
                                style={{ height: "auto", minHeight: "160px" }}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="image-upload-wrapper mb-3">
                        <div>
                          <label htmlFor="featuredImage" className="form-label">
                            Featured Image
                          </label>
                          <Controller
                            name="featuredImage"
                            control={control}
                            defaultValue={null}
                            // rules={validationRules.featuredImage}
                            render={({ field }) => (
                              <input
                                type="file"
                                accept="image/*"
                                id="featured_image"
                                 required
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  field.onChange(file);
                                  setfeaturedImages(file);
                                }}
                              />
                            )}
                          />
                          {errors.featuredImage && (
                            <span className="text-danger">
                              {errors.featuredImage.message}
                            </span>
                          )}
                        </div>
                        <div>
                          <label htmlFor="otherImages" className="form-label">
                            Other Images:
                          </label>
                          <Controller
                            name="otherImages"
                            control={control}
                            defaultValue={[]}
                            render={({ field }) => (
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const file = e.target.files;
                                  field.onChange(file);
                                  setOtherImages([...file]);
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                </div>
                <div className="col-md-12">
                  <button
                    className="formButton submit my-5 justify-content-end"
                    type="submit"
                    name="submit"
                    onChange={handleFormSubmit}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterProvider
        backClick={() => navigate("/become-a-provider/add-facility")}
        nextClick={() => navigate("/become-a-provider/add-court")}
        activeStep={activeStep}
      />
    </>
  );
};

export default AddYourServices;
