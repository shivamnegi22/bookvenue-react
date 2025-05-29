import React, { useState, useEffect } from 'react';
import "../../css/Booking.css";
import Cookies from "js-cookie";
import { axiosAuth } from "../../utils/axiosInstance"; 

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userToken = Cookies.get("USER_TOKEN");
        const response = await axiosAuth.get('my-bookings');

        if (response.status === 200) {
          setBookings(response.data.bookings); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className='bookingSect'>
      <div className="row">
        <div className='col-lg-12'>
          <h4 className="fw-bold"> All-Bookings</h4>
        </div>
        {bookings.length > 0 && (
          <table className='my-4 Booktable'>
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Facility</th>
                <th>Court</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td>{booking.name}</td>
                  <td>{booking.facility}</td>
                  <td>{booking.court}</td>
                  <td>{booking.date}</td>
                  <td>{booking.start_time}</td>
                  <td>{booking.end_time}</td>
                  <td>{booking.price}</td>
                  <td >{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default Booking;
