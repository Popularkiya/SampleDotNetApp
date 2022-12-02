import "./App.scss";
import { Home } from "./Home";
import { Temperature } from "./Temperature";
import { CarbonDioxide } from "./CarbonDioxide";
import { Humidity } from "./Humidity";
import { Ultraviolet } from "./Ultraviolet";
import { Top } from "./Top";
import { BrowserRouter, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App container">
        <Top />
        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink className="btn btn-light btn-outline-primary" to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/carbon-dioxide"
              >
                Carbon Dioxide
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/humidity"
              >
                Humidity
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/temperature"
              >
                Temperature
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink
                className="btn btn-light btn-outline-primary"
                to="/ultraviolet"
              >
                Ultraviolet
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/carbon-dioxide" element={<CarbonDioxide />} />
          <Route path="/humidity" element={<Humidity />} />
          <Route path="/temperature" element={<Temperature />} />
          <Route path="/ultraviolet" element={<Ultraviolet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
