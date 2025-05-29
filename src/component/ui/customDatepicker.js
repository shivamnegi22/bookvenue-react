import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomDatePicker = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
  
    if (date && date.getTime() !== currentDate.getTime()) {
      // Exclude the current date from selection
      const updatedDates = selectedDates.includes(date)
        ? selectedDates.filter((selectedDate) => selectedDate.getTime() !== date.getTime())
        : [...selectedDates, date];
  
      setSelectedDates(updatedDates);
    }
  };
  
  

  return (
    <div>
      <h4>Select Holidays:</h4>
      <DatePicker
        selected={selectedDates}
        onChange={(date) => handleDateChange(date)}
        inline
        excludeDates={[new Date()]}
        highlightDates={selectedDates}
        selectsRange
      />
      <div>
        <h5>Selected Holidays:</h5>
        <ul>
          {selectedDates.map((date, index) => (
            <li key={index}>
              {date.toISOString().split('T')[0]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomDatePicker;
