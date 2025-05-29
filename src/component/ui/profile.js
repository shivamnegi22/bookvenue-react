import { useForm } from "react-hook-form";
import "../../css/profile.css";
import { axiosAuth } from "../../utils/axiosInstance";
import Cookies from "js-cookie";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const userToken = Cookies.get("USER_TOKEN");
    const payLoad = {
      name: data.name,
      email: data.email,
      contact: data.contact,
      address: data.address,
    };
    try {
      const response = await axiosAuth.post("profileUpdate", payLoad);
      if (response.statusText == "OK") {
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="edit-profile-usr">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="fw-bold">Edit Profile</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row mt-lg-3">
                <div className="col-lg-6">
                  <div className="form-row">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter First Name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <p className="error-message">
                        First name is required
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-row">
                    <label htmlFor="phone" className="form-label">
                      Contact No
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="9548316146"
                      {...register("contact", { required: true })}
                    />
                    {errors.contact && (
                      <p className="error-message ">
                        contact number is required
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-row">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Enter email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <p className="error-message">Email is required</p>
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-row">
                    <label htmlFor="lastName" className="form-label">
                      Address{" "}
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Address"
                      {...register("address", { required: true })}
                    />
                    
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="profile-action-btn-wrapper-usr d-flex justify-content-end">
                    <button
                      className="primary-btn border-0 reset me-3"
                      type="reset"
                      onClick={() => reset()}
                    >
                      Reset
                    </button>
                    <button className="primary-btn border-0" type="submit">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
