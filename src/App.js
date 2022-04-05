import React from "react";
import "./App.css";
import Landing from "./components/Landing/Landing.jsx";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import { Footer } from "./components/Footer/footer";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
