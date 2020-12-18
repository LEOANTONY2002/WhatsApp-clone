import SideBar from './SideBar';
import React, { useState,useEffect } from 'react';
import './App.css';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App">
    {
      !user ? (
        <Login />
      ) : (
        <Router>
       <SideBar />
        <Switch> 
          <Route path="/rooms/:roomId">
            <Chat />
          </Route>
          <Route path="/">
            <Chat />
          </Route>
        </Switch>
      </Router>
      )
    }
    </div>
  );
}

export default App;
