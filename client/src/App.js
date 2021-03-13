import React from 'react';
import { BrowserRouter as Router, Route, Switch,Redirect  } from "react-router-dom";
import NavBar from './components/NavBar/NavBar';
import "bootstrap/dist/css/bootstrap.min.css";
import 'antd/dist/antd.css';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import Verification from './components/Verification/Verification';
import HomePage from './components/HomePage/HomePage';
import HistoryPage from './components/HistoryPage/HistoryPage';

function App() {
  return (
    <Router >
      <NavBar />
      <Switch>
        <Route exact path="/register" component={(RegisterPage)} />
        <Route exact path="/login" component={(LoginPage)} />
        <Route exact path="/verifyUser" component={(Verification)} />
        <Route exact path="/" component={(HomePage)} />
        <Route exact path="/history" component={(HistoryPage)} />
      </Switch>
    </Router>
  );
}

export default App;
