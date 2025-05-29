import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Default } from "../layouts/default";
import Loader from "../common/loader";
import axios from "axios";
import { useForm } from "react-hook-form";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
const IMG_URL = process.env.REACT_APP_IMG_URL;
const Booknow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [initialData, setInitialData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleBooknow = (data) => {
    console.log(data, "data");
  };

  useEffect(() => {
    getIntialData();
    if (!state) {
      navigate("/");
    }
  }, [state]);

  const getIntialData = async () => {
    await axios
      .get(
        `${BASE_URL}/${
          state.type == "venues" ? "get-all-venues" : "get-all-sports"
        }`
      )
      .then((response) => {
        setInitialData(response.data);

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("Error founding initial data.");
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Default>
          <section className="container py-5">
            <div className="row">
              <div className="col-7 d-flex align-items-center">
                <div className="card p-3">
                  <form onSubmit={handleSubmit(handleBooknow)}>
                    <div className="row">
                      <div className="col-6">
                        <div className="form-row">
                          <>
                            {state.type == "venues" ? (
                              <>
                                <label htmlFor="sports">Venues</label>
                                <select
                                  className="form-input w-100"
                                  id="sports"
                                  defaultValue={null}
                                  {...register("sports", {
                                    required: true,
                                })}
                                >
                                  <option value="" hidden>
                                    Choose Type
                                  </option>
                                  {initialData && initialData.length > 0 ? (
                                    <>
                                      {initialData.map((item, index) => {
                                        return (
                                          <option value={item.name}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </>
                                  ) : null}
                                </select>
                              </>
                            ) : (
                              <>
                                <label htmlFor="sports">Sports</label>
                                <select
                                  className="form-input w-100"
                                  id="sports"
                                  defaultValue={null}
                                  {...register("sports", {
                                    required: true,
                                })}
                                >
                                  <option value="" hidden>
                                    Choose Type
                                  </option>
                                  {initialData && initialData.length > 0 ? (
                                    <>
                                      {initialData.map((item, index) => {
                                        return (
                                          <option value={item.name}>
                                            {item.name}
                                          </option>
                                        );
                                      })}
                                    </>
                                  ) : null}
                                </select>
                              </>
                            )}
                          </>
                        </div>
                        {errors.sports && (
                           <p className="text-danger">This field is required</p>
                                        )}
                      </div>
                      <div className="col-6">
                        <div className="form-row">
                          <label htmlFor="startTime">Start Time</label>
                          <input
                            type="time"
                            className="form-input w-100"
                            id="startTime"
                            placeholder="08:00 pm"
                            {...register("startTime", {
                              required: true,
                          })}
                          />
                           {errors.startTime && (
                                            <p className="text-danger">This field is required</p>
                                        )}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-row">
                          <label htmlFor="court">Select Court</label>
                          <select
                            className="form-input w-100"
                            id="court"
                            defaultValue={null}
                            {...register("court", {
                              required: true,
                          })}
                          >
                            <option value="" hidden>
                              Choose Court
                            </option>
                            <option value="1">Court 1</option>
                            <option value="2">Court 2</option>
                            <option value="3">Court 3</option>
                          </select>
                          {errors.court && (
                           <p className="text-danger">This field is required</p>
                                        )}
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-row">
                          <label htmlFor="date">Date</label>
                          <input
                            type="text"
                            className="form-input w-100"
                            id="date"
                            value={state.date}
                            readOnly
                            disabled
                            {...register("date", {
                              required: true,
                          })}
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-row">
                          <label htmlFor="date">Duration</label>
                          <div class="input-group">
                            <span
                              class="input-group-text btn primary-btn  px-3"
                              onClick={() =>
                                duration > 1 ? setDuration(duration - 1) : null
                              }
                            >
                              -
                            </span>
                            <input
                            id="duration"
                              type="text"
                              class="form-control"
                              value={`${duration} Hrs`}
                              readOnly
                              disabled
                              {...register("duration", {
                                required: true,
                            })}
                              
                            />
                            <span
                              class="input-group-text btn primary-btn  px-3"
                              onClick={() => {
                                setDuration(duration + 1);
                              }}
                            >
                              +
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-6  d-flex align-items-center">
                        <button type="submit" className="btn primary-btn w-100">
                          Confirm Booking
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-5">
                <div className="card">
                  <img
                    src={`${IMG_URL}${state.facility.featured_image}`}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </section>
        </Default>
      )}
    </>
  );
};

export default Booknow;
