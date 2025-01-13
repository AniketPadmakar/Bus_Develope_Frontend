import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getToken } from "../../data/Token";
import hostURL from "../../data/URL";
import axios from "axios";

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
        frequency: "", // Frequency in days
    });
    const [hasToken, setHasToken] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Function to check if the "token" cookie is present
        const checkTokenCookie = () => {
            const retrivedToken = getToken('token');
            setHasToken(!!retrivedToken); // Set hasToken to true if token exists, false otherwise
            setToken(retrivedToken);
            console.log(token)
        };

        checkTokenCookie();
    }, [token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                hostURL.link + '/api/admin/add-bus',
                formData,
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
