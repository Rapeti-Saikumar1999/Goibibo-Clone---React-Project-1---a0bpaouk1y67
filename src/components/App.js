import NavBar from "./NavBar/NavBar";
import { Route,Routes } from "react-router-dom";
import "../styles/App.css"
import Flights from "./Flight/Flights"
import FlightSearch from "./Flight/FlightSearch";
function App() {
  return <div>
    <NavBar/>
    <Routes>
      <Route path="/" element={<Flights />} />
      <Route path="/flights/:search" element={<FlightSearch />} />

      <Route path="/hotels" element={<Flights/>} />
      <Route path="/trains" element={<Flights/>} />
      <Route path="/bus" element={<Flights/>} />
      <Route path="/mytrips" element={<Flights/>} />
    </Routes>
    
  </div>;
}

export default App;
