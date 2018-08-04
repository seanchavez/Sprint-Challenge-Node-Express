import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DisplayProjects from './components/DisplayProjects';

const App = () => {
  return ( 
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={DisplayProjects} />
      
      </Switch>
    </BrowserRouter>
   );
}
 
export default App;