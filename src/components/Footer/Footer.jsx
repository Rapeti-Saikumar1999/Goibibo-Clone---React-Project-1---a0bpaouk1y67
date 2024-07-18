import React from "react";
import "./Footer.css"; // Ensure the CSS file is imported
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AppleIcon from "@mui/icons-material/Apple";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-section">
          <h4>OUR PRODUCTS</h4>
          <ul>
            <li>Domestic Hotels</li>
            <li>International Hotels</li>
            <li>Domestic Flights</li>
            <li>International Flights</li>
            <li>Multi-City Flights</li>
            <li>Couple Friendly Hotels</li>
            <li>Nearby Getaways</li>
            <li>Bus Booking</li>
            <li>Cab Booking</li>
            <li>Airport Cabs Booking</li>
            <li>Outstation Cabs Booking</li>
            <li>Train Booking</li>
            <li>Go Stay</li>
            <li>Gift Cards</li>
            <li>Gift</li>
            <li>Trip Money</li>
            <li>Gobibo Advertising Solutions</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>ABOUT US</h4>
          <ul>
            <li>About Us</li>
            <li>Investor Relations</li>
            <li>Management</li>
            <li>Terms of Services</li>
            <li>User Agreement</li>
            <li>Privacy</li>
            <li>Careers</li>
            <li>YouTube Channel</li>
            <li>Technology@GobiboF</li>
            <li>Customer Support</li>
            <li>Facebook Page</li>
            <li>Twitter Handle</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>TRAVEL ESSENTIALS</h4>
          <ul>
            <li>PNR Status</li>
            <li>Flight Timers</li>
            <li>Airline Routes</li>
            <li>Train Running Status</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>MORE LINKS</h4>
          <ul>
            <li>Cheap Flights</li>
            <li>Hotels Near Me</li>
            <li>My Bookings</li>
            <li>Cancellation</li>
            <li>My Account</li>
            <li>Wallet</li>
            <li>Advertise with Us</li>
          </ul>
        </div>
      </footer>
      <div className="footer-icons">
        <hr className="footer-hr" />
        <div className="footer-nav">
          <div className="follow-us">
            <p>Follow Us</p>
            <div className="follow-us-images">
              <FacebookIcon />
              <TwitterIcon />
              <YouTubeIcon />
            </div>
          </div>
          <div className="download-buttons">
            <p>Book Tickets faster. Download our mobile Apps</p>
            <div>
              <button>
                <PlayArrowIcon color="white" /> Google Play
              </button>
              <button>
                <AppleIcon /> Apple Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
