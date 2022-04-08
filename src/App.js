import React from "react";
import "./App.css";
import Landing from "./components/Landing/Landing.jsx";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";

import FlightDetail from "./components/FlightDetail/FlightDetail";
import SuccessPayment from "./components/SuccessPayment/SuccessPayment";

import { Footer } from "./components/Footer/footer";
//import UserProfile from "./components/userProfile/UserProfile";
import UserProfileForm from "./components/userProfile/UserProfileForm";
import { About } from "./components/About/About";
import Top from "./components/TopDestinations/RutaTop";
import NoMatch from "./components/404/404";


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
        <Route exact path="/about">
          <About />
        </Route>
           <Route  path="*">
          <NoMatch/>
        </Route>
        <Route exact path="/top">
          <Top />
        </Route>
      

        <Route exact path='/:id'>
          <FlightDetail />
        </Route>
        <Route exact path='/success'>
          <SuccessPayment />
        </Route>
      
        <Route exact path="/userconfig">
          <UserProfileForm />
        </Route>
      
     


      </Switch>
      <Footer/>
    </div>
  );
}

export default App;
