import React, { Component } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import SkillsPage from "./SkillsPage/SkillsPage";
import Login from "./Login/Login";
import EmployeeHome from "./EmployeeHome/EmployeeHome";
import ManagerHome from "./ManagerHome/ManagerHome";
import axios from "axios";
import Header from "./Header/Header";
import ApprovalsPage from "./ApprovalsPage/ApprovalsPage";
import EmployeeApprovalPage from "./EmployeeApprovalPage/EmployeeApprovalPage";
import FilterTable from "./FilterTable/FilterTable";
import SkillMatrix from "./SkillMatrix/SkillMatrix";
import Visualizations from "./Visualizations/Visualizations";
import EmpsUnderManager from "./EmpsUnderManager/EmpsUnderManager";
import EmployeeSkillPage from "./EmployeeSkillPage/EmployeeSkillPage";
import NoMatch from "./NoMatch/NoMatch";
import AdminHome from "./AdminHome/AdminHome";
import AddEmployee from "./AddEmployee/AddEmployee";
import Dashboard from "./Dashboard/Dashboard";
import EmployeeVisualizations from "./EmployeeVisualizations/EmployeeVisualizations";
class App extends Component {
    state = {
        err: "",
        userdata: {},
        loginForm: {
            email: "",
            password: "",
        },
        isAuthenticated: false,
        manager: false,
    };

    handleChange = (e) => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [e.target.name]: e.target.value,
            },
        });
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ err: "" });
        try {
            const response = await axios.post(
                "http://localhost:3001/authUser",
                this.state.loginForm
            );
            console.log(response.data);
            if (response.data.err === null) {
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("emp_id", response.data.data.emp_id);
                this.setState({
                    userdata: response.data.data,
                    loginForm: { email: "", password: "" },
                    isAuthenticated: localStorage.getItem("isAuthenticated"),
                });
                if (response.data.data.roles === "admin") {
                    console.log("reached here");
                    this.setState({ role: "admin" });
                    localStorage.setItem("role", "admin");
                    this.props.history.push("/ahome");
                } else if (response.data.data.roles === "manager") {
                    this.setState({ manager: true });
                    localStorage.setItem("role", "manager");
                    this.props.history.push("/mhome");
                } else {
                    localStorage.setItem("role", "employee");
                    localStorage.getItem("emp_id");
                    this.props.history.push("/ehome");
                }
            } else {
                this.setState({
                    err: response.data.err,
                    loginForm: { email: "", password: "" },
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    handleLogout = (e) => {
        localStorage.removeItem("emp_id");
        this.props.history.push("/");
        localStorage.setItem("isAuthenticated", "false");
        localStorage.removeItem("role");
        this.setState({
            err: "",
            userdata: {},
            loginForm: {
                email: "",
                password: "",
            },
            isAuthenticated: false,
            manager: false,
        });
    };
    render() {
        let routes;
        const role = localStorage.getItem("role");
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (isAuthenticated === "false") {
            routes = (
                <>
                    <Switch>
                        <Route
                            exact
                            path='/'
                            render={(props) => (
                                <Login
                                    {...props}
                                    handleSubmit={this.handleSubmit}
                                    handleChange={this.handleChange}
                                    loginDetails={this.state.loginForm}
                                    err={this.state.err}
                                />
                            )}
                        />
                        <Route path='*' component={NoMatch} />
                    </Switch>
                </>
            );
        }
        if (isAuthenticated === "true" && role === "manager") {
            routes = (
                <>
                    <Switch>
                        <Route exact path='/' component={ManagerHome} />
                        <Route exact path='/mhome' component={ManagerHome} />
                        <Route exact path='/table' component={FilterTable} />
                        <Route exact path='/dashboard' component={Dashboard} />
                        <Route exact path='/skills' component={SkillsPage} />
                        <Route exact path='/matrix' component={SkillMatrix} />
                        <Route
                            exact
                            path='/visualizations'
                            component={Visualizations}
                        />
                        <Route
                            exact
                            path='/approvals'
                            component={ApprovalsPage}
                        />
                        <Route
                            exact
                            path='/employees'
                            component={EmpsUnderManager}
                        />
                        <Route
                            path='/approvals/:id'
                            render={(props) => (
                                <EmployeeApprovalPage
                                    {...props}
                                    emp_id={props.match.params.id}
                                />
                            )}
                        />
                        <Route
                            path='/employees/:id'
                            render={(props) => (
                                <EmployeeSkillPage
                                    {...props}
                                    emp_id={props.match.params.id}
                                />
                            )}
                        />
                        <Route path='*' component={NoMatch} />
                    </Switch>
                </>
            );
        }
        if (isAuthenticated === "true" && role === "employee") {
            routes = (
                <>
                    <Switch>
                        <Route exact path='/' component={EmployeeHome} />
                        <Route
                            exact
                            path='/evisualizations'
                            component={EmployeeVisualizations}
                        />
                        <Route exact path='/ehome' component={EmployeeHome} />
                        <Route exact path='/skills' component={SkillsPage} />
                        <Route exact path='/matrix' component={SkillMatrix} />
                        <Route path='*' component={NoMatch} />
                    </Switch>
                </>
            );
        }
        if (isAuthenticated === "true" && role === "admin") {
            routes = (
                <>
                    <Switch>
                        <Route exact path='/' component={AdminHome} />
                        <Route exact path='/ahome' component={AdminHome} />
                        <Route exact path='/addEmp' component={AddEmployee} />
                        <Route path='*' component={NoMatch} />
                    </Switch>
                </>
            );
        }
        return (
            <div className='App'>
                <Header
                    isAuthenticated={this.state.isAuthenticated}
                    userdata={this.state.userdata}
                    handleLogout={this.handleLogout}
                />
                {routes}
            </div>
        );
    }
}

export default withRouter(App);
