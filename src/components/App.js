import NavBar from "./NavBar/NavBar";
import { Route,Routes } from "react-router-dom";
import "../styles/App.css"
import Flights from "./Flight/Flights"
import FlightSearch from "./Flight/FlightSearch";
import Login from "./Login&SignUp/Login";
import SignUp from "./Login&SignUp/SignUp";
import AuthNavigator from "../Auth/AuthNavigator";
import AuthContextProvider from "../Auth/AuthContextProvider";
import FlightCheckout from "./Flight/FlightCheckout"
import FlightPayment from "./Flight/FlightPayment";
import MyTrips from "./MyTrips/MyTrips";
import Hotel from "./Hotel/Hotel";
import HotelSearch from "./Hotel/HotelSearch";
import HotelDisplay from "./Hotel/HotelDisplay";
import HotelCheckout from "./Hotel/HotelCheckout";
import Hotelpayment from "./Hotel/Hotelpayment";
import Train from "./Train/Train";
import TrainSearch from "./Train/TrainSearch";
import TrainCheckout from "./Train/TrainCheckout";
import TrainPayment from "./Train/TrainPayment";
import Bus from "./Bus/Bus";
import BusSearch from "./Bus/BusSearch";
import BusBooking from "./Bus/BusBooking"
import BusCheckout from "./Bus/BusCheckout";
import BusPayment from "./Bus/BusPayment";
function App() {
  return <div>
    <AuthContextProvider>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Flights />} />
      <Route path="/flights/:search" element={<FlightSearch />} />
      <Route path="/flights/checkout" element={<FlightCheckout />} />
      <Route path="/flights/payment" element={<FlightPayment />} />
      <Route path="/hotels" element={<Hotel/>} />
      <Route path="/hotels/search/:location" element={<HotelSearch/>} />
      <Route path="/hotels/display/:id" element={<HotelDisplay/>} />
      <Route path="/hotels/checkout" element={<HotelCheckout/>} />
      <Route path="/hotels/payment" element={<Hotelpayment/>} />



      
      <Route path="/trains" element={<Train/>} />
      <Route path="/trains/search/:source" element={<TrainSearch/>} />
      <Route path="/trains/checkout" element={<TrainCheckout/>} />
      <Route path="/trains/payment" element={<TrainPayment/>} />


      <Route path="/bus" element={<Bus/>} />
      <Route path="/bus/search/:source" element={<BusSearch/>} />
      <Route path="/bus/booking/:_id" element={<BusBooking/>} />
      <Route path="/bus/checkout" element={<BusCheckout/>} />
      <Route path="/bus/payment" element={<BusPayment/>} />


      <Route path="/mytrips" element={<AuthNavigator><MyTrips/></AuthNavigator>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      
    </Routes>
    </AuthContextProvider>
    
  </div>;
}

export default App;
