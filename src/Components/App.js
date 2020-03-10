import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom'
// import {Container} from 'semantic-ui-react'
// import SkillForm from './SkillForm/SkillForm';
import SkillsPage from './SkillsPage/SkillsPage';
import Login from './Login/Login';
// import Spinner from './Spinner/Spinner'
import EmployeeHome from './EmployeeHome/EmployeeHome';
import Header from './Header/Header';
// import ManagerHome from './ManagerHome/ManagerHome';


class App extends Component {
  render(){
    
    return (
    <div className="App">
      <Router>
        <Header/>
        <Route path="/" exact component={Login}/>
        <Route path="/ehome" component={EmployeeHome}/>
        <Route path="/skills" component={SkillsPage}/>
      {/* <ManagerHome/> */}
      {/* <SkillsPage/> */}
      </Router>
    </div>
  );
}
}

export default App;
