import "./App.css";
import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/Detail/Detail";
import { CreateRecipe } from "./components/CreateRecipe/CreateRecipe";

//Baila tu cuerpo alegria macarena <3
function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Home} />
      <Route path="/create" component={CreateRecipe} />
      <Route path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;
