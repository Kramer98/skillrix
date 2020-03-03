import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
// import Login from './Login/Login';
// import Spinner from './Spinner/Spinner'
// import Test from './Test/Test'
import EmployeeHome from './EmployeeHome/EmployeeHome';


function App() {
  return (
    <div className="App">
      <Router>
      {/* <Login/> */}
      {/* <Test/> */}
      <EmployeeHome/>
      {/* <EmployeeMenu/>
      <EmployeePhoto/> */}
      {/* <Spinner/> */}
      </Router>
    </div>
  );
}

export default App;
