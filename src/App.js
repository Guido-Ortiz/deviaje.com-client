import Landing from './components/Landing/Landing.jsx'
import Nav  from './components/Nav/Nav.jsx'
import "./App.css";
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';


function App() {
  return (
    <div className="App">
       <Switch>
          <Route exact path="/home" component={Home} />
        </Switch>
        <Switch>
          <Route exact path="/landing" component={Landing} />
        </Switch>
    </div>
  );
}

export default App;
