import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
// import SkillForm from './SkillForm/SkillForm';
import SkillsPage from './SkillsPage/SkillsPage';
// import Login from './Login/Login';
// import Spinner from './Spinner/Spinner'
// import Test from './Test/Test'
import EmployeeHome from './EmployeeHome/EmployeeHome';
// import ManagerHome from './ManagerHome/ManagerHome';


class App extends Component {
  render(){
    
    return (
    <div className="App">
      <Router>
      {/* <EmployeeHome/> */}
      {/* <ManagerHome/> */}
      <SkillsPage/>
      </Router>
    </div>
  );
}
}

export default App;
