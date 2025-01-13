import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from "../../data/Token";
import hostURL from "../../data/URL";
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
  padding: 40px 0;
`;

const TicketCard = styled.div`
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 15px 0;
  width: 90%;
  max-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const TicketInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 60%;
`;

const TicketName = styled.h2`
  font-size: 1.2rem;
  color: #333;
`;

const TicketDetails = styled.p`
  font-size: 1rem;
  color: #666;
`;

const ViewMoreButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 180px;
  margin-top: 15px;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5);
  }
`;

const ViewTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

   const [hasToken, setHasToken] = useState(false);
      const [token, setToken] = useState(null);
  
      useEffect(() => {
          // Function to check if the "token" cookie is present
          const checkTokenCookie = () => {
              const retrivedToken = getToken('token');
              setHasToken(!!retrivedToken); // Set hasToken to true if token exists, false otherwise
              setToken(retrivedToken);
              console.log(token);
          };
  
          checkTokenCookie();
      }, [token]);
  

  // Fetch tickets when the component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${hostURL.link}/api/user/view-tickets`, {
          headers: {
            Authorization: `Bearer ${getToken('token')}`,
          }
        });

        if (response.status === 200) {
          setTickets(response.data.tickets);
        } else {
          console.error('Error fetching tickets:', response.data.error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchTickets();
  }, []);

  // Redirect to ticket detail page with ticketId
  const handleViewTicket = (ticketId) => {
    navigate(`/user-view-ticket-details/${ticketId}`);
  };

  return (
    <Container>
      {tickets.length === 0 ? (
        <p>No tickets available at the moment.</p>
      ) : (
        tickets.map((ticket) => (
          <TicketCard key={ticket._id}>
            <TicketInfo>
              <TicketName>{ticket.busId.busName}</TicketName>
              <TicketDetails>Timing: {ticket.busId.timing}</TicketDetails>
              <TicketDetails>From: {ticket.busId.arrivalFrom}</TicketDetails>
              <TicketDetails>Destination: {ticket.busId.destination}</TicketDetails>
            </TicketInfo>
            <ViewMoreButton onClick={() => handleViewTicket(ticket._id)}>
              View More Information
            </ViewMoreButton>
          </TicketCard>
        ))
      )}
    </Container>
  );
};

export default ViewTickets;
