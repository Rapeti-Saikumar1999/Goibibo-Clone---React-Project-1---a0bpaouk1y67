// import React from "react";
import "./Styles/FlightPayment.css";
import { useLocation } from "react-router-dom";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Fade from "@mui/material/Fade";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../Footer/Footer";

function FlightPayment() {
  const location = useLocation();
  const state = location.state;
  const [cardnum, setcardnum] = useState("");
  const [name, setName] = useState("");
  const [cvv, setCvv] = useState("");
  const [exp, setexp] = useState("");
  const [upiid, setUpiid] = useState("");
  const [upipin, setUpipin] = useState("");
  const navigate = useNavigate();

  const flightID = state.details._id;
  console.log(flightID);

  //@mui
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };
  //

  const handleupipayment = async (e) => {
    e.preventDefault();
    if (upiid && upipin) {
      try {
        const token = sessionStorage.getItem("userToken");
        const config = {
          headers: {
            projectId: "a0bpaouk1y67",
            Authorization: `Bearer ${token}`,
          },
        };

        const reqBody = {
          bookingType: "flight",
          bookingDetails: {
            flightId: flightID,
          },
        };

        const res = await axios.post(
          "https://academics.newtonschool.co/api/v1/bookingportals/booking",
          { ...reqBody, appType: "bookingportals" },
          config
        );

        alert("Booking Success!!");

        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please provide all details");
    }
  };

  const handlecreaditpayment = async () => {
    const currentDate = new Date();
    const expDate = new Date(exp);
    if (expDate < currentDate) {
      alert("Please select a future expiration date.");
      return;
    }
    if (name && cardnum && cvv && exp) {
      try {
        const token = sessionStorage.getItem("userToken");

        const config = {
          headers: {
            projectId: "a0bpaouk1y67",
            Authorization: `Bearer ${token}`,
          },
        };

        const reqBody = {
          bookingType: "flight",
          bookingDetails: {
            flightId: flightID,
          },
        };

        await axios.post(
          "https://academics.newtonschool.co/api/v1/bookingportals/booking",
          reqBody,
          config
        );
        alert("Booking Success!!");

        navigate("/");
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("Please provide all details");
    }
  };
  return (
    <div className="flight-search-bgc flight-payment-main-container">
      <div className="payment-container">
        <h2>Pay ₹ {state.details.ticketPrice + 1678} to confirm booking</h2>

        <div className="flight-user-details">
          <div className="payment-flight-details">
            <div className="airline-details">
              {/* <p>{state.details.airline}</p> */}
              <h4>{state.details.flightID}</h4>
            </div>

            <div className="payment-flight-info">
              <div>
                <p>{state.details.source}</p>
                <h4>{state.details.departureTime}</h4>
              </div>
              <div>
                <p>
                  Duration: {state.details.duration}
                  {state.details.duration > 1 ? " hrs" : " hr"}
                </p>
                <h4>Stops: {state.details.stops}</h4>
              </div>
              <div>
                <p>{state.details.destination}</p>
                <h4>{state.details.arrivalTime}</h4>
              </div>
            </div>
          </div>

          <div className="user-details">
            <p>
              <span>Name: </span>
              {state.FirstName} {state.LastName}
            </p>
            <p>
              <span>Email: </span>
              {state.Email}
            </p>
            <p>
              <span>Phone Number: </span>
              {state.PhoneNo}
            </p>
          </div>
        </div>

        <div className="flight-payment-container">
          <h3>ALL PAYMENT OPTIONS</h3>
          <div>
            <Accordion
              expanded={expanded}
              onChange={handleExpansion}
              slots={{ transition: Fade }}
              slotProps={{ transition: { timeout: 400 } }}
              sx={{
                "& .MuiAccordion-region": { height: expanded ? "auto" : 0 },
                "& .MuiAccordionDetails-root": {
                  display: expanded ? "block" : "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>
                  <h3>UPI Options</h3>
                  <p>Pay directly from your Bank Account</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <form onSubmit={(e) => handleupipayment(e)}>
                    <div className="paymentsucesss">
                      <div>
                        <label htmlFor="upiid">UPI Id:</label>
                        <input
                          type="text"
                          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                          value={upiid}
                          onChange={(e) => setUpiid(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="upipin">UPI Pin: </label>
                        <input
                          type="tel"
                          pattern="[0-9]{6}"
                          value={upipin}
                          onChange={(e) => setUpipin(e.target.value)}
                          required
                          placeholder="Please enter exactly 6 digits"
                        />
                      </div>
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  <h3>Credit/Debit/ATM Card</h3>
                  <p>Visa, MasterCard, Amex, Rupay and more</p>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <form onSubmit={handlecreaditpayment}>
                    <div className="paymentsucesss">
                      <div>
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          pattern="[0-9]{13,16}"
                          value={cardnum}
                          onChange={(e) => setcardnum(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="name">Name on Card: </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          pattern="[A-Za-z ]{1,}"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="expiration">Expiration: </label>
                        <input
                          type="date"
                          id="expiration"
                          name="expiration"
                          value={exp}
                          onChange={(e) => setexp(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv">CVV: </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          pattern="[0-9]{3,4}"
                          title="Enter a valid CVV (3 or 4 digits)"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                        />
                      </div>
                      <button type="submit">Submit</button>
                    </div>
                  </form>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FlightPayment;
