import "./App.css";
import { useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
//Baila tu cuerpo alegria macarena <3
function App() {
  const location = useLocation();
  console.log(location);

  return (
    <div className="App">
      {location.pathname === "/" ? <LandingPage /> : <Home />}
    </div>
  );
}

export default App;
