import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "../../css/form.css";
import DatePicker from "react-multi-date-picker";
import axios from "axios";
import { useRef } from "react";
import { useLoaderData } from "react-router-dom";
import { axiosAuth } from "../../utils/axiosInstance";


const baseURL = process.env.REACT_APP_API_ENDPOINT;

const AddService = () => {
  const { facility } = useLoaderData()

  const [showService, setShowService] = useState(false);
  const [showFormfield, setShowFormField] = useState(false);
  const [service, setService] = useState([]);
  const [courts, setCourts] = useState([]);
  const formRef = useRef(null);
  const [payload,setPayload] = useState({});
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const validationRules = {
    description: { required: "Description are required" },
    featuredImage: { required: "Images are required" },
  };

  
  const handleFormSubmit = (data) =>{
    let holidaysCopy = [...data.holidays];
    data['holidays'] = holidaysCopy.map ((item) => `${item.day < 10 ? '0' :''}${item.day}-${item.month < 10 ? '0' :''}${item.month}-${item.year}`);

    
    console.log(data,'data is this of form')
  }

  const handleSubmitClick = () =>{
    if(formRef.current){
      formRef.current.click();
    }
  }

  const handleFacilityChange = (id) => {
    getService(id);
    setShowService(true);
  };



  const showFormFields = () => {
    setShowFormField(true);
  };

  const getService = async (id) => {

    let url = `${baseURL}/get-service-by-id/${id}`;
    try {
      let response = await axiosAuth.get(url);
      if (response && response.data) {
        setService(response.data.services);
      }
    } catch (error) {
      console.log("this a error", error);
    }
    finally{
      setPayload(prevUser => ({
        ...prevUser, // Copy the existing state
        "facility": id, // Update the key
      }));
    }
  };

  const handleAddService = (data) => {
    const courtData = {
      courtName: data.name,
      startTime: data.Time,
      endTime: data.selectedtime,
      price: data.price,
      duration: data.duration,
      breakStart: data.selectedTime,
      breakEnd: data.TimeSel,
    };

    console.log("Court Data:", courtData);
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
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="mb-3">
                      <label className="form-label">Choose Facility</label>
                      <select
                      name="facility"
                      className="form-select"
                      {...register('facility')}
                      onChange={(e)=>{
                        getService(e.target.value)
                      }}
                      required
                        >
                        <option hidden>Choose Facility</option>
                            {facility &&
                              facility.length > 0 &&
                              facility.map((facility, index) => (
                                <option
                                  key={index}
                                  value={facility.id}
                                >
                                  {facility.official_name}
                                </option>
                              ))}
                      </select>
                    </div>
                  </div>
                  {payload && payload.facility && payload.facility != '' && (
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Choose Service</label>
                        <select
                      name="services"
                      className="form-select"
                      {...register('services')}
                      onChange={(e)=>{
                        console.log(payload,'payload is this')
                        setPayload(prevUser => ({
                          ...prevUser, // Copy the existing state
                          "services": e.target.value, // Update the key
                        }));
                      }}
                      required
                        >
                        <option selected hidden>
                                Choose Service
                              </option>
                              {service &&
                                service.length > 0 &&
                                service.map((service, index) => {
                                  return (
                                    <option key={index} value={service.id}>
                                      {service.name}
                                    </option>
                                  );
                                })}
                      </select>
                      </div>
                    </div>
                  )}
                  {payload && (payload.facility && payload.services) && (payload.facility != '' && payload.services != '') && (
                    <>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Holidays</label>
                          <div className="custom-date-picker">
                          <Controller
                            name="holidays"
                            control={control}
                            defaultValue={[]}
                            rules={validationRules.holidays}
                            render={({ field }) => (
                              <DatePicker
                                {...field}
                                format="DD-MM-YYYY"
                                placeholder="DD-MM-YYYY"
                                clear
                                minDate={new Date()}
                                multiple
                                className="form-control"
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
                              control={control}
                              defaultValue=""
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
                              rules={validationRules.featuredImage}
                              render={({ field }) => (
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    field.onChange(file);
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
                                    const files = e.target.files;
                                    field.onChange(files);
                                  }}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
</>
                  )}
                  </div>
                  <button type="submit" ref={formRef} className="d-none"></button>
                      </form>
{/* Courts add form started */}
{showService && showFormfield && (
                    <>
                    <form
                    onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="row">
                      <div className="col-lg-12 mt-lg">
                        <h2 className="common-form-heading inner-heading">
                          <span> Courts</span>
                        </h2>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Court Name</label>
                          <input type="text" name="courtName" className="form-control" />
                          {/* {errors.name && (
                            <span className="text-danger">
                              {errors.name.message}
                            </span>
                          )} */}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <label className="form-label">Start Time</label>
                          <input type="time" name="startTime" className="form-control" />
                          {/* <Controller
                            name="Time"
                            control={control}
                            defaultValue=""
                            rules={validationRules.Time}
                            render={({ field }) => (
                              <input
                                {...field}
                                type="time"
                                className="form-control"
                              />
                            )}
                          />
                          {errors.Time && (
                            <span className="text-danger">
                              {errors.Time.message}
                            </span>
                          )} */}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label className="form-label">End Time</label>
                        
                        <input type="time" name="courtName" className="form-control" />
                        {/* <Controller
                          name="selectedtime"
                          control={control}
                          defaultValue=""
                          rules={validationRules.selectedtime}
                          render={({ field }) => (
                            <input
                              {...field}
                              type="time"
                              className="form-control"
                            />
                          )}
                        />
                        {errors.selectedtime && (
                          <span className="text-danger">
                            {errors.selectedtime.message}
                          </span>
                        )} */}
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <div>
                            <label
                              htmlFor="description"
                              className="d-block form-label"
                            >
                              Description:
                            </label>
                            <textarea
                                rows="5"
                                  className="w-100 form-control"
                                ></textarea>
                            {/* <Controller
                              name="description"
                              control={control}
                              defaultValue=""
                              rules={validationRules.description}
                              render={({ field }) => (
                                <textarea
                                  className="w-100 form-control"
                                  {...field}
                                  style={{ height: "auto", minHeight: "160px" }}
                                />
                              )}
                            />
                            {errors.description && (
                              <span className="text-danger">
                                {errors.description.message}
                              </span>
                            )} */}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="price"
                                className="d-block form-label"
                              >
                                Price
                              </label>
                              
                        <input type="number" name="courtName" className="form-control" />
                              {/* <Controller
                                name="price"
                                control={control}
                                defaultValue=""
                                rules={validationRules.price}
                                render={({ field }) => (
                                  <input
                                    className="form-control"
                                    type="number"
                                    {...field}
                                  />
                                )}
                              />
                              {errors.price && (
                                <span className="text-danger">
                                  {errors.price.message}
                                </span>
                              )} */}
                            </div>
                          </div>
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="price"
                                className="d-block form-label"
                              >
                                Duration
                              </label>
                              
                        <input type="number" name="courtName" className="form-control" />
                              {/* <Controller
                                name="duration"
                                control={control}
                                defaultValue=""
                                rules={validationRules.duration}
                                render={({ field }) => (
                                  <input
                                    className="form-control"
                                    type="number"
                                    {...field}
                                  />
                                )}
                              />
                              {errors.duration && (
                                <span className="text-danger">
                                  {errors.duration.message}
                                </span>
                              )} */}
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="mb-3">
                              <label className="form-label">Break Start</label>
                              
                        <input type="time" name="courtName" className="form-control" />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="mb-3">
                              <label className="form-label">Break End</label>
                              
                        <input type="time" name="courtName" className="form-control" />
   
                            </div>
                          </div>
                          <div className="col-lg-4 text-center">
                            <label className="form-label invisible d-block">
                              Break End
                            </label>
                            <button
                              type="button"
                              className="btn btn-success border-0 w-20"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                      </div>
                      </form>
                    </>
                  )}
                {showService && showFormfield && (
                  <>
                    <button type="button" className="btn btn-primary me-3" onClick={()=>handleSubmitClick()}>
                      Submit
                    </button>
                    <button type="button" className="btn btn-success">
                      Add Court
                    </button>
                  </>
                )}
                
                </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default AddService;
