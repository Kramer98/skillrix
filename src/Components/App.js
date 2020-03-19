import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
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

class App extends Component {
    state = {
        err: "",
        userdata: {},
        loginForm: {
            email: "",
            password: ""
        },
        isAuthenticated: false,
        manager: false
    };

    handleChange = e => {
        this.setState({
            loginForm: {
                ...this.state.loginForm,
                [e.target.name]: e.target.value
            }
        });
    };
    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ err: "" });
        try {
            const response = await axios.post(
                "http://localhost:3001/authUser",
                this.state.loginForm
            );
            if (response.data.err === null) {
                localStorage.setItem("isAuthenticated", true);
                this.setState({
                    userdata: response.data.data,
                    loginForm: { email: "", password: "" },
                    isAuthenticated: localStorage.getItem("isAuthenticated")
                });
                localStorage.setItem("emp_id", response.data.data.emp_id);
                if (response.data.data.manager === true) {
                    this.setState({ manager: true });
                    this.props.history.push("/mhome");
                } else {
                    localStorage.setItem("manager", false);
                    this.props.history.push("/ehome");
                }
            } else {
                this.setState({
                    err: response.data.err,
                    loginForm: { email: "", password: "" }
                });
            }
        } catch (err) {
            console.log(err);
        }
    };

    handleLogout = e => {
        localStorage.removeItem("emp_id");
        this.props.history.push("/");
        localStorage.setItem("isAuthenticated", false);
        this.setState({
            err: "",
            userdata: {},
            loginForm: {
                email: "",
                password: ""
            },
            isAuthenticated: false,
            manager: false
        });
    };
    render() {
        return (
            <div className='App'>
                <Header
                    isAuthenticated={this.state.isAuthenticated}
                    userdata={this.state.userdata}
                    handleLogout={this.handleLogout}
                />
                <Route
                    path='/'
                    exact
                    render={props => (
                        <Login
                            {...props}
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            loginDetails={this.state.loginForm}
                            err={this.state.err}
                        />
                    )}
                />

                {localStorage.getItem("isAuthenticated") &&
                this.state.manager ? (
                    <>
                        <Route exact path='/mhome' component={ManagerHome} />
                        <Route exact path='/table' component={FilterTable} />
                        <Route exact path='/skills' component={SkillsPage} />
                        <Route exact path='/matrix' component={SkillMatrix} />
                        <Route
                            exact
                            path='/approvals'
                            component={ApprovalsPage}
                        />
                        <Route
                            path='/approvals/:id'
                            render={props => (
                                <EmployeeApprovalPage
                                    {...props}
                                    emp_id={props.match.params.id}
                                />
                            )}
                        />
                    </>
                ) : (
                    <>
                        <Route exact path='/ehome' component={EmployeeHome} />
                        <Route exact path='/skills' component={SkillsPage} />
                        <Route exact path='/matrix' component={SkillMatrix} />
                    </>
                )}
            </div>
        );
    }
}

export default App = withRouter(App);
