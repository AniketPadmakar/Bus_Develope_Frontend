import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getToken } from "../../data/Token";
import hostURL from "../../data/URL";
import axios from "axios";

// Helper functions to format date and time
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toISOString().split("T")[0]; // Extracts yyyy-MM-dd
};

const formatTime = (time12h) => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");

  if (modifier === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  return `${hours}:${minutes}`;
};

const formatTo12Hour = (time24h) => {
  const [hours, minutes] = time24h.split(":");
  const modifier = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${minutes} ${modifier}`;
};

// Helper functions to check if date or time is in the past
const isDateInPast = (selectedDate) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Today's date in yyyy-mm-dd format
  return selectedDate < currentDate; // Compare selected date with today
};

// Updated isTimeInPast function to handle 12-hour time format
const isTimeInPast = (selectedDate, selectedTime) => {
  const currentDate = new Date();
  const [time, modifier] = selectedTime.split(" ");
  let [hours, minutes] = time.split(":");

  // Convert the selected time to 24-hour format
  if (modifier === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }

  const selectedDateTime = new Date(selectedDate);
  selectedDateTime.setHours(hours, minutes);

  const timeDifference = selectedDateTime - currentDate; // Difference in milliseconds
  const minTimeDifference = 2 * 60 * 60 * 1000; // Minimum difference (2 hours) in milliseconds

  return timeDifference < minTimeDifference; // Ensure time is at least 2 hours ahead
};

const AddBusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const FormWrapper = styled.div`
  width: 400px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const AddBus = () => {
  const [formData, setFormData] = useState({
    busName: "",
    busNumber: "",
    operatorName: "",
    rate: "",
    date: "",
    timing: "",
    totalSeats: "",
    arrivalFrom: "",
    destination: "",
    frequency: "",
  });

  const [hasToken, setHasToken] = useState(false);
  const [token, setToken] = useState(null);

  // Store the current date in "YYYY-MM-DD" format for setting the min value
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const checkTokenCookie = () => {
      const retrievedToken = getToken("token");
      setHasToken(!!retrievedToken);
      setToken(retrievedToken);
    };

    checkTokenCookie();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Date and Time Validation
    if (isDateInPast(formData.date)) {
      alert("Date cannot be in the past.");
      return; // Prevent form submission
    }

    if (isTimeInPast(formData.date, formData.timing)) {
      alert("Time must be at least 2 hours ahead from current time.");
      return; // Prevent form submission
    }

    // Format date and time for submission
    const formattedFormData = {
      ...formData,
      timing: formatTime(formData.timing), // Convert to 24-hour format for API submission
      date: new Date(formData.date).toISOString(), // Convert the date to ISO format
    };

    try {
      const response = await axios.post(
        hostURL.link + "/api/admin/add-bus",
        formattedFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Bus added successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to add bus. Please try again.");
    }
  };

  return (
    <AddBusContainer>
      <FormWrapper>
        <Title>Add Bus</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="busName"
            placeholder="Bus Name"
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="busNumber"
            placeholder="Bus Number"
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="operatorName"
            placeholder="Operator Name"
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="rate"
            placeholder="Rate"
            onChange={handleChange}
            required
          />
          <Input
            type="date"
            name="date"
            placeholder="Date"
            onChange={handleChange}
            min={today} // Set the min attribute to prevent past dates
            required
          />
          <Input
            type="text"
            name="timing"
            placeholder="Timing (e.g., 10:00 AM)"
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="arrivalFrom"
            placeholder="Arrival From"
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="destination"
            placeholder="Destination"
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="frequency"
            placeholder="Frequency in Days (e.g., 7)"
            onChange={handleChange}
          />
          <Button type="submit">Submit</Button>
        </form>
      </FormWrapper>
    </AddBusContainer>
  );
};

export default AddBus;
