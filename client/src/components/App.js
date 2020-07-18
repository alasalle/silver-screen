import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import Register_Login from "./Register_Login";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/login" component={Register_Login}/>
      </Switch>
    </div>
  );
}

export default App;
