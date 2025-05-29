import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import LocationAwareMap from "../common/googlemap";
import { useForm, Controller } from "react-hook-form";
import SearchLocation from "../common/searchLocation";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import Loader from "../common/loader";
import { useMutation } from "react-query";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const IMG_URL = process.env.REACT_APP_IMG_URL;

const AddFacility = () => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [coordsError,setCoordsError] = useState(false);
  const [coords,setCoords] = useState(null)

  const [categories,setCategories] = useState(null);
  const [aminities,setAminities] = useState(null);
  const [isLoading,setIsLoading] = useState(true)

    
  const getInitialData = async() =>{
    const getAllServiceCategory = axios.get(`${BASE_URL}/get-all-services`);
    const getAllAminities = axios.get(`${BASE_URL}/get-all-amenities`);

    await axios.all([getAllServiceCategory, getAllAminities]).then(axios.spread(function(res1, res2) {
      setCategories(res1.data.services);
      setAminities(res2.data.amenities);
      setIsLoading(false)
    })).catch((error)=>{
      setIsLoading(false)
      console.log("Error geting initial data:"+error)
    });
  }

  useEffect(()=>{
    getInitialData()
  },[])


  const createFacility = useMutation(
    (formData) =>
      fetch(`${BASE_URL}/create-facility`, {
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
        console.log(data,'facility created successfully')
      },
      onError: (error) => {
        console.log('error creating facility')
      },
    }
  );

  // form code



  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleConfirmLocation = () =>{
    
    if(markerPosition && markerPosition.lat && markerPosition.lng){
      setCoords(markerPosition)
      setVisible(false)
      setCoordsError(false)
    }
    else{
      setCoordsError(true)
    }
  }

  const handleAddFacility = (data) => {
    if(coords && coords.lat && coords.lng){
      let dataCopy = {...data,...coords,service_category_id:data.service_category_id.id}
      if(data.amenities){
        dataCopy = {...dataCopy,amenities:data.amenities.map(({ id }) => ( id ))}
      }
      else{
        dataCopy = {...dataCopy,amenities:null}
      }

      // const formData = new FormData();

      // for (const key in dataCopy) {
      //   formData.append(key, dataCopy[key]);
      // }
      console.log(dataCopy,'data is this')
      createFacility.mutate(dataCopy)
      // console.log(dataCopy,'complete data is this')
    }
    else{
      setCoordsError(true);
    }
    
  };

  const handleButtonClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMarkerPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setError("Allow access to location.");
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setError("Location information is unavailable.");
          } else if (error.code === error.TIMEOUT) {
            setError("Request to get location timed out.");
          } else {
            setError("An unknown error occurred.");
          }
        }
      );
    } else {
      setError("Geolocation is not available in your browser");
    }
  };

  useEffect(() => {
    if (error) {
      openLocationSettings();
    }
  }, [error]);

  const openLocationSettings = () => {
    // Provide instructions on how to open browser location settings.
    // Instructions may vary by browser.
    const browser = detectBrowser();
    switch (browser) {
      case "Chrome":
        alert(
          "To enable location access in Chrome, click on the three vertical dots in the top-right corner, go to 'Settings,' then 'Privacy and security,' and finally 'Site settings.' From there, you can enable location access."
        );
        break;
      case "Firefox":
        alert(
          "To enable location access in Firefox, click on the three horizontal lines in the top-right corner, go to 'Options,' then 'Privacy & Security,' and under 'Permissions,' click on 'Settings' next to 'Location.' From there, you can enable location access."
        );
        break;
      case "Safari":
        alert(
          "To enable location access in Safari, go to 'Safari' in the menu bar, select 'Preferences,' click on the 'Websites' tab, and then select 'Location' from the left panel. You can then enable location access for specific websites."
        );
        break;
      default:
        alert(
          "To enable location access in your browser, please refer to your browser's settings."
        );
    }
  };

  const detectBrowser = () => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("chrome")) {
      return "Chrome";
    } else if (userAgent.includes("firefox")) {
      return "Firefox";
    } else if (userAgent.includes("safari")) {
      return "Safari";
    } else {
      return "Unknown";
    }
  };

  const handleMarkerDrag = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
  };

  const selectSearch = (event) => {
    if (event.coords) {
      setMarkerPosition(event.coords);
    }
  };

  return (
    <>
    {isLoading ? <Loader/> :
      <section>
        <div className="container">
          <div className="row ">
            <h4 className=" fw-bold "> Add Facility</h4>
            <div className="col-12 mt-5">
              <form
                onSubmit={handleSubmit(handleAddFacility)}
                enctype="multipart/form-data"
              >
                <div className="row">
                  <div className="col-lg-3 mb-5">
                    <div className="form-row">
                      <span className="p-float-label">
                        <InputText
                          className="form-input w-100"
                          id="name"
                          {...register("name", {
                            required: true,
                            pattern: /^[A-Za-z\s]+$/,
                          })}
                        />
                        <label htmlFor="name">Official Name</label>
                      </span>
                    </div>
                    {errors.name && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>

                  <div className="col-lg-3 mb-5">
                    <div className=" form-row">
                      <span className="p-float-label">
                        <InputText
                          className="form-input w-100"
                          id="alias"
                          {...register("alias")}
                         
                        />
                        <label htmlFor="alias">Alias</label>
                      </span>
                    </div>
                   
                  </div>
                  <div className="col-lg-3 mb-5">
                    <div className="form-row">
                      <span className="p-float-label">
                        <Controller
                          name="service_category_id"
                          className="form-input w-100"
                          control={control}
                          rules={{ required: true }} // Add validation rules if needed
                          render={({ field }) => (
                            <Dropdown
                              id="service_category_id"
                              {...field}
                              options={categories}
                              optionLabel="name"
                              placeholder="Select a type"
                            />
                          )}
                        />

                        <label htmlFor="service_category_id">Select Type</label>
                      </span>
                    </div>
                    {errors.service_category_id && (
                      <p className="text-danger">This field is required</p>
                    )}
                  </div>

                  <div className="col-lg-3 mb-5">
                    <div className="form-row">
                      <button
                        className="common-location-btn form-input  btn"
                        type="button"
                        onClick={() => setVisible(true)}
                      >
                        location
                        <span className="ms-2">
                          <svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10.2917 6.83333C8.45 6.83333 6.95833 8.325 6.95833 10.1667C6.95833 12.0083 8.45 13.5 10.2917 13.5C12.1333 13.5 13.625 12.0083 13.625 10.1667C13.625 8.325 12.1333 6.83333 10.2917 6.83333ZM17.7417 9.33333C17.3583 5.85833 14.6 3.1 11.125 2.71667V1.83333C11.125 1.375 10.75 1 10.2917 1C9.83333 1 9.45833 1.375 9.45833 1.83333V2.71667C5.98333 3.1 3.225 5.85833 2.84167 9.33333H1.95833C1.5 9.33333 1.125 9.70833 1.125 10.1667C1.125 10.625 1.5 11 1.95833 11H2.84167C3.225 14.475 5.98333 17.2333 9.45833 17.6167V18.5C9.45833 18.9583 9.83333 19.3333 10.2917 19.3333C10.75 19.3333 11.125 18.9583 11.125 18.5V17.6167C14.6 17.2333 17.3583 14.475 17.7417 11H18.625C19.0833 11 19.4583 10.625 19.4583 10.1667C19.4583 9.70833 19.0833 9.33333 18.625 9.33333H17.7417ZM10.2917 16C7.06667 16 4.45833 13.3917 4.45833 10.1667C4.45833 6.94167 7.06667 4.33333 10.2917 4.33333C13.5167 4.33333 16.125 6.94167 16.125 10.1667C16.125 13.3917 13.5167 16 10.2917 16Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </button>
                      {/* {(errors.lat || errors.lng) && (
                      <p className="text-danger">Location required</p>
                    )} */}
                    {coordsError ? <div className="col-md-12">
                    <p className="text-danger">Select location first.</p>
                    </div> : null}

                    </div>
                  </div>

                  <div className="col-6 mb-5">
                    <p className="upload-heading">Upload Featured Image</p>
                    <div className="card border-0 upload-card">
                      <Controller
                        name="featured_image"
                        control={control}
                        render={({ field }) => (
                          <input
                            className="form-input"
                            type="file"
                            {...register("featured_image", {
                                required: true,
                              })}
                            onChange={(e) => {
                              const featured_image = e.target.files[0];
                              field.onChange(featured_image);
                            }}
                          />
                          
                        )}
                      />
                        {errors.featured_image && (
                      <p className="text-danger">This field is required</p>
                    )}
                    </div>
                  </div>

                  <div className="col-lg-6 mb-5">
                    <div className="form-row">
                    <p className="upload-heading invisible">Upload Featured Image</p>
                      <span className="p-float-label">
                        <InputTextarea
                          className="form-input w-100"
                          id="address"
                          {...register("address")}
                          rows={5}
                        />
                        <label htmlFor="address">Address</label>
                      </span>
                    </div>
                   
                  </div>

                  <div className="col-lg-3 mb-5">
                    <div className="form-row">
                      <span className="p-float-label">
                        <Controller
                          name="amenities"
                          control={control} // Add validation rules if needed
                          render={({ field }) => (
                            <MultiSelect
                              id="amenities "
                              {...field}
                              options={aminities}
                              optionLabel="name"
                              className="w-full md:w-20rem form-input"
                              multiple={true}
                            />
                          )}
                        />

                        <label htmlFor="amenities">Select Aminites </label>
                      </span>
                    </div>
                  </div>

                  <div className="col-12 mb-5">
                    <span className="p-float-label">
                      <InputTextarea
                        autoResize
                        id="description"
                        className="w-100"                        
                        rows={7}
                        cols={30}
                        {...register("description")}
                      />
                      <label htmlFor="description">Description</label>
                    </span>
                   
                  </div>
                  <div className="col-12 d-flex align-items-center justify-content-center">
                    <button type="submit" className="btn primary-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Dialog
          className=" search-location-popup"
          header="Select Location"
          visible={visible}
          maximizable
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card flex justify-content-center h-100">
                <SearchLocation cb={selectSearch} className="w-100 h-100" />
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card flex justify-content-center">
                <Button
                  label="Use Current Location"
                  severity="secondary"
                  onClick={handleButtonClick}
                  className="common-location-btn form-input  btn "
                />
                <span class="ms-2 pop-icon">
                  <svg
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2917 6.83333C8.45 6.83333 6.95833 8.325 6.95833 10.1667C6.95833 12.0083 8.45 13.5 10.2917 13.5C12.1333 13.5 13.625 12.0083 13.625 10.1667C13.625 8.325 12.1333 6.83333 10.2917 6.83333ZM17.7417 9.33333C17.3583 5.85833 14.6 3.1 11.125 2.71667V1.83333C11.125 1.375 10.75 1 10.2917 1C9.83333 1 9.45833 1.375 9.45833 1.83333V2.71667C5.98333 3.1 3.225 5.85833 2.84167 9.33333H1.95833C1.5 9.33333 1.125 9.70833 1.125 10.1667C1.125 10.625 1.5 11 1.95833 11H2.84167C3.225 14.475 5.98333 17.2333 9.45833 17.6167V18.5C9.45833 18.9583 9.83333 19.3333 10.2917 19.3333C10.75 19.3333 11.125 18.9583 11.125 18.5V17.6167C14.6 17.2333 17.3583 14.475 17.7417 11H18.625C19.0833 11 19.4583 10.625 19.4583 10.1667C19.4583 9.70833 19.0833 9.33333 18.625 9.33333H17.7417ZM10.2917 16C7.06667 16 4.45833 13.3917 4.45833 10.1667C4.45833 6.94167 7.06667 4.33333 10.2917 4.33333C13.5167 4.33333 16.125 6.94167 16.125 10.1667C16.125 13.3917 13.5167 16 10.2917 16Z"
                      fill="white"
                    ></path>
                  </svg>
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card flex justify-content-center">
                <LocationAwareMap
                  coords={markerPosition}
                  onMarkerDragEnd={handleMarkerDrag} //function
                  markerDraggable={true}
                  markerTitle="Your location"
                  height="60vh"
                />
              </div>
            </div>
            {coordsError ? <div className="col-md-12">
            <p className="text-danger">Select location first.</p>
            </div> : null}
            
            <div className="col-md-12 mt-lg-4">
              <div className="select-location-btn-wrapper">
                <div className="left">
                  <Button
                  onClick={()=>{setVisible(false)}}
                    label="Cancel"
                    className="common-location-btn form-input cancel "
                  />
                </div>
                <div className="right">
                  <Button
                    label="Confirm"
                    onClick={()=>handleConfirmLocation()}
                    className="common-location-btn form-input  "
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </section>
      }
    </>
  );
};

export default AddFacility;
