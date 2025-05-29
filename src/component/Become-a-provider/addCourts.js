import React, { useEffect, useState } from "react";
import "../../css/BecomeProvider.css";
import FooterProvider from "./footerProvider";
import { useNavigate, useParams } from "react-router-dom";
import { axiosAuth } from "../../utils/axiosInstance";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT;

const AddYourCourts = () => {
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [breakStartTime, setBreakStartTime] = useState("");
  const [breakEndTime, setBreakEndTime] = useState("");
  const [breakTimes, setBreakTimes] = useState([]);
  const [courts, setCourts] = useState([]);
  const [courtName, setcourtName] = useState([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [activeStep, setActiveStep] = useState(2);

  const params = useParams();
  console.log("check court outside ", parseInt(params.id));

  const [payload, setPayload] = useState({
    facility_service_id: params && parseInt(params.id),
    courts_data: [],
  });

  const addCourtFields = () => {
    console.log("check court ", courts);

    const newCourt = {
      courtName: courtName && courtName,
      startTime: startTime && startTime,
      endTime: endTime && endTime,
      description: description && description,
      price: price && price,
      duration: duration && duration,
      breakTimes: breakTimes && breakTimes,
    };
    setCourts([...courts, newCourt]);
  };

  useEffect(() => {
    if (courts && courts.length > 0) {
      setcourtName("");
      setStartTime("");
      setEndTime("");
      setBreakTimes([]);
      setDescription("");
      setPrice("");
      setDuration("");
    }
  }, [courts]);

  const handleCourtInputChange = (index, event) => {
    const { name, value } = event.target;

    const updatedCourts = [...courts];
    updatedCourts[index][name] = value;
  };

  const removeCourt = (index) => {
    const updatedCourts = [...courts];
    updatedCourts.splice(index, 1);
    setCourts(updatedCourts);
  };

  const removeBreakTime = (index) => {
    const updatedBreakTimes = [...breakTimes];
    updatedBreakTimes.splice(index, 1);
    setBreakTimes(updatedBreakTimes);
  };

  const addBreakTime = () => {
    if (breakStartTime && breakEndTime) {
      setBreakTimes([
        ...breakTimes,
        { start: breakStartTime, end: breakEndTime },
      ]);
      // setBreakTimes([''])
      setBreakStartTime("");
      setBreakEndTime("");
    }
  };

  const handleStartTimeChange = (event) => {
    const selectedTime = event.target.value;
    const isAM = selectedTime.includes("AM");

    setStartTime(selectedTime);
    setEndTime(isAM ? selectedTime : "");
    // setBreakStartTime(selectedTime);
    setBreakEndTime(isAM ? selectedTime : "");
  };

  const handleEndTimeChange = (event) => {
    setEndTime(event.target.value);
  };

  const handleBreakStartTimeChange = (event) => {
    let joUserNeDalaHai = event.target.value;

    if (joUserNeDalaHai > startTime && joUserNeDalaHai < endTime) {
      setBreakStartTime(joUserNeDalaHai);
    } else {
      setBreakStartTime("");
    }
  };

  const handleBreakEndTimeChange = (event) => {
    if (event.target.value > startTime && event.target.value < endTime) {
      setBreakEndTime(event.target.value);
    } else {
      setBreakEndTime("");
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    console.log("check court ", courts);
    const newCourt = {
      courtName: courtName && courtName,
      startTime: startTime && startTime,
      endTime: endTime && endTime,
      description: description && description,
      price: price && price,
      duration: duration && duration,
      breakTimes: breakTimes && breakTimes,
    };
    //setCourts([...courts, newCourt]);

    courts.push(newCourt);

    payload.courts_data = JSON.stringify([...courts]);
    console.log("this is my payload", payload);

    const response = await axiosAuth.post(`${BASE_URL}/create-court`, payload);

    //   if (startTime && endTime && breakStartTime && breakEndTime) {
    //     const startTimeObj = new Date(`2023-01-01 ${startTime}`);
    //     const endTimeObj = new Date(`2023-01-01 ${endTime}`);
    //     const breakStartObj = new Date(`2000-01-01T${breakStartTime}`);
    //     const breakEndObj = new Date(`2000-01-01T${breakEndTime}`);

    //     if (endTimeObj <= startTimeObj) {
    //       alert("End time must be after start time");
    //       return;
    //     }

    //     if (
    //       startTimeObj <= breakStartObj &&
    //       endTimeObj >= breakEndObj &&
    //       breakStartObj < breakEndObj
    //     ) {
    //       alert("Break time overlaps with working hours");
    //       return;
    //     }

    //     // Check if break end is after break start
    //     if (breakEndObj <= breakStartObj) {
    //       alert("Break end time must be after break start time");
    //       return;
    //     }

    //     navigate("/become-a-provider/add-courts");
    //   } else {
    //     // alert("Please fill in all time fields");
    //   }
  };

  return (
    <>
      <section className="add-service-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={handleSave}>
                <div className="row">
                  <div className="col-lg-12 mt-lg">
                    <h2 className="common-form-heading inner-heading">
                      <span> Court </span>
                    </h2>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 mt-lg">
                      {/* <h2 className="common-form-heading inner-heading">
                      <span> Courts</span>
                    </h2> */}
                    </div>
                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Court Name</label>
                        <input
                          type="text"
                          name="courtName"
                          className="form-control"
                          value={courtName}
                          onChange={(e) => setcourtName(e.target.value)}
                          // onChange={(e) => handleCourtInputChange(0, e)}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="mb-3">
                        <label className="form-label">Start Time</label>
                        <input
                          type="time"
                          name="startTime"
                          className="form-control"
                          value={startTime}
                          onChange={handleStartTimeChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <label className="form-label">End Time</label>

                      <input
                        type="time"
                        name="endTime"
                        className="form-control"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        required
                      />
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
                            value={description}
                            // onChange={handleEndTimeChange}
                            onChange={(e) => setDescription(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-lg-6">
                          <label htmlFor="price" className="d-block form-label">
                            Price
                          </label>
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              name="price"
                              class="form-control"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              required
                            />
                            <span class="input-group-text">$</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <label
                            htmlFor="duration"
                            className="d-block form-label"
                          >
                            Duration
                          </label>
                          <div class="input-group mb-3">
                            <input
                              type="number"
                              name="duration"
                              class="form-control"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              required
                            />
                            <span class="input-group-text">Min</span>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label className="form-label">Break Start</label>

                            <input
                              type="time"
                              name="breakStartTime"
                              className="form-control"
                              value={breakStartTime}
                              onChange={handleBreakStartTimeChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label className="form-label">Break End</label>

                            <input
                              type="time"
                              name="breakEndTime"
                              className="form-control"
                              value={breakEndTime}
                              onChange={handleBreakEndTimeChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 text-center">
                          <label className="form-label invisible d-block">
                            Break End
                          </label>
                          <button
                            type="button"
                            className="btn btn-success border-0 w-20"
                            onClick={addBreakTime}
                          >
                            Add
                          </button>
                        </div>

                        {breakTimes.map((breakTime, index) => (
                          <div className="col-lg-8" key={index}>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Break Start
                                  </label>
                                  <input
                                    type="time"
                                    name={`breakStartTime-${index}`}
                                    className="form-control"
                                    value={breakTime.start}
                                    onChange={(e) =>
                                      handleBreakStartTimeChange(e, index)
                                    }
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label className="form-label">
                                    Break End
                                  </label>
                                  <input
                                    type="time"
                                    name={`breakEndTime-${index}`}
                                    className="form-control"
                                    value={breakTime.end}
                                    onChange={(e) =>
                                      handleBreakEndTimeChange(e, index)
                                    }
                                  />
                                  <div className="col-md-12 d-flex justify-content-end">
                                    <button
                                      type="button"
                                      className="btn btn-danger border-0 w-20 m-3"
                                      onClick={() => removeBreakTime()}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {courts.map((court, index) => (
                  <>
                    {console.log("insdie courts loop", court)}
                    <div key={index} className="row">
                      <div className="col-lg-12 mt-lg">
                        <h2 className="common-form-heading inner-heading">
                          <span> Court {index + 1}</span>
                        </h2>
                      </div>
                      <div className="row">
                        <div className="col-lg-12 mt-lg">
                          {/* <h2 className="common-form-heading inner-heading">
                      <span> Courts</span>
                    </h2> */}
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label className="form-label">Court Name</label>
                            <input
                              type="text"
                              name="courtName"
                              className="form-control"
                              value={court.courtName}
                              onChange={(e) => handleCourtInputChange(index, e)}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label className="form-label">Start Time</label>
                            <input
                              type="time"
                              name="startTime"
                              className="form-control"
                              value={court.startTime}
                              onChange={handleStartTimeChange}
                            />
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <label className="form-label">End Time</label>

                          <input
                            type="time"
                            name="endTime"
                            className="form-control"
                            value={court.endTime}
                            onChange={handleEndTimeChange}
                          />
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
                                value={court.description}
                                // onChange={(e) => setDescription(e.target.value)}
                              ></textarea>
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

                                <input
                                  type="number"
                                  name="price"
                                  className="form-control"
                                  value={court.price}
                                  // onChange={(e) => setPrice(e.target.value)}
                                />
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

                                <input
                                  type="number"
                                  name="duration"
                                  className="form-control"
                                  value={court.duration}
                                  // onChange={(e) => setDuration(e.target.value)}
                                />
                              </div>
                            </div>

                            {court.breakTimes.map((time, index) => (
                              <div className="col-lg-8" key={index}>
                                {console.log("check break time0", time)}
                                <div className="row">
                                  <div className="col-lg-6">
                                    <div className="mb-3">
                                      <label className="form-label">
                                        Break Start
                                      </label>
                                      <input
                                        type="time"
                                        name={`breakStartTime-${index}`}
                                        className="form-control"
                                        value={time.start}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-lg-6">
                                    <div className="mb-3">
                                      <label className="form-label">
                                        Break End
                                      </label>
                                      <input
                                        type="time"
                                        name={`breakEndTime-${index}`}
                                        className="form-control"
                                        value={time.end}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 ">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeCourt(index)}
                        >
                          Remove Court
                        </button>
                      </div>
                    </div>
                  </>
                ))}

                <div className="col-md-12">
                  <button
                    className="formButton my-5 bg-success"
                    type="button"
                    onClick={addCourtFields}
                  >
                    Add Court
                  </button>

                  <button
                    className="formButton submit my-5 m-5"
                    type="submit"
                    name="submit"
                    onChange={handleSave}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* <div>Add Your Courts</div>
    <button type='button'>Finish</button> */}
      <FooterProvider
        backClick={() => navigate("/become-a-provider")}
        nextClick={() => navigate("/become-a-provider/add-courts")}
        activeStep={activeStep}
      />
    </>
  );
};

export default AddYourCourts;
