import FooterComponent from './components/FooterComponent';
import Login from './components/LoginComponents';
import { useEffect, useState } from 'react';
import AlertComponent from './components/AlertComponent';
import { ethers } from 'ethers';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';


import React from 'react';
import PersondataComponents from './components/PersondataComponents';
import ViewPatientComponent from './components/ViewPatientComponent';


function App() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const [currentBalance, setCurrentBalanace] = useState(null);

  return <div>

    <div className="App">
            <Router>
              <div className="App">
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              
                <div className='logo-holder logo-3 mr-3'>
                    <a >
                      <h3>Smart Care</h3>
                      <p>A smart Dapp</p>
                    </a>
              </div>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse mr-3" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                      <Link className="nav-link btn btn-outline-success" to='/'>Login And Buy Token <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item active">
                      <Link className="nav-link btn btn-outline-success ml-2" to="/AddPatient">Mine Patient Data<span className="sr-only">(current)</span></Link>
                    </li>

                    <li className="nav-item active">
                      <Link className="nav-link btn btn-outline-success ml-2" to="/viewPatient">View Patiet Data<span className="sr-only">(current)</span></Link>
                    </li>

          

                  </ul>
                  <button type="button" class="btn btn-success mr-3">
                  Account Address <span class="badge badge-light">{currentAccount}</span>
                </button>

                <button type="button" class="btn btn-success">
                SC Token Balance <span class="badge badge-light">{currentBalance}</span>
                </button>

          
                  
                </div>
              </nav>
              <Routes>
                    
                  <Route exact path='/' element={<Login currentAccount={currentAccount} setCurrentAccounts={setCurrentAccount} setCurrentBalanaces={setCurrentBalanace}></Login>}></Route> 
                  <Route exact path='/AddPatient' element={currentAccount ? <PersondataComponents funct={setCurrentBalanace} currentAccount={currentAccount} currentBalance={currentBalance}></PersondataComponents> : <Login currentAccount={currentAccount} setCurrentAccounts={setCurrentAccount} setCurrentBalanaces={setCurrentBalanace}></Login>}></Route>
                  <Route exact path='/viewPatient' element={currentAccount ? <ViewPatientComponent funct={setCurrentBalanace} currentAccount={currentAccount} currentBalance={currentBalance}></ViewPatientComponent> : <Login currentAccount={currentAccount} setCurrentAccounts={setCurrentAccount} setCurrentBalanaces={setCurrentBalanace}></Login>}></Route>

                    
                                                      
              </Routes>
              </div>
              <AlertComponent></AlertComponent>
              <FooterComponent></FooterComponent>
          </Router>

    </div>
  </div>;
}

export default App;



