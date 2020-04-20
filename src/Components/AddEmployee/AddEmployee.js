import React, { Component } from "react";
import { Form, Container, Input, Header, Divider } from "semantic-ui-react";
import axios from "axios";

class AddEmployee extends Component {
    state = {
        emp_name: "",
        email: "",
        emp_id: "",
        account: "",
        practice: "",
        hire_date: "",
        emp_role: "",
        manager_id: "",
        roles: "",
        emp_location: "",
        password: "",
    };
    accountOptions = [
        { key: "Oracle", text: "Oracle", value: "Oracle" },
        { key: "VMWare", text: "VMWare", value: "VMWare" },
        { key: "Atlassian", text: "Atlassian", value: "Atlassian" },
        { key: "Driscoll's", text: "Driscoll's", value: "Driscoll's" },
        { key: "Cisco", text: "Cisco", value: "Cisco" },
    ];
    rolesOptions = [
        { key: "Employee", text: "Employee", value: "employee" },
        { key: "manager", text: "Manager", value: "manager" },
        { key: "Admin", text: "Admin", value: "admin" },
    ];
    locationOptions = [
        { key: "Bangalore", text: "Bangalore", value: "Bangalore" },
        { key: "Hyderabad", text: "Hyderabad", value: "Hyderabad" },
        { key: "Milpitas", text: "Milpitas", value: "Milpitas" },
        { key: "Chandigarh", text: "Chandigarh", value: "Chandigarh" },
    ];

    handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(
            "http://localhost:3001/addNewEmployee",
            this.state
        );
        this.setState({
            emp_name: "",
            email: "",
            emp_id: "",
            account: "",
            practice: "",
            hire_date: "",
            emp_role: "",
            manager_id: "",
            roles: "",
            emp_location: "",
            password: "",
        });
    };
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    selectChange = (e, { id, value }) => {
        // console.log(k);
        this.setState({ [id]: value });
    };

    render() {
        return (
            <Container>
                <Header size='huge' textAlign='center'>
                    Add Employee
                </Header>
                <Divider />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field required>
                        <label>Full name</label>
                        <Input
                            name='emp_name'
                            required
                            value={this.state.emp_name}
                            fluid
                            onChange={this.handleChange}
                            placeholder='Enter Full name'
                        />
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            <label>Employee ID</label>
                            <Input
                                name='emp_id'
                                value={this.state.emp_id}
                                required
                                onChange={this.handleChange}
                                fluid
                                placeholder='Emp Id'
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Account</label>
                            <Form.Select
                                required
                                id='account'
                                value={this.state.account}
                                placeholder='Select Account'
                                onChange={this.selectChange}
                                options={this.accountOptions}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Practice</label>
                            <Input
                                required
                                fluid
                                value={this.state.practice}
                                name='practice'
                                onChange={this.handleChange}
                                placeholder='Javascript/Java/Kotlin'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            <label>Hire Date</label>
                            <Input
                                required
                                type='date'
                                fluid
                                value={this.state.hire_date}
                                name='hire_date'
                                onChange={this.handleChange}
                                placeholder='Emp Id'
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Employee Role</label>
                            <Input
                                required
                                fluid
                                value={this.state.emp_role}
                                name='emp_role'
                                onChange={this.handleChange}
                                placeholder='UI/Data Analyst/Backend...'
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Manager ID</label>
                            <Input
                                required
                                name='manager_id'
                                value={this.state.manager_id}
                                onChange={this.handleChange}
                                fluid
                                placeholder='Manager ID'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-error-email'
                            required
                            control={Input}
                            value={this.state.email}
                            type='email'
                            name='email'
                            onChange={this.handleChange}
                            label='Email'
                            placeholder='joe@doe.com'
                        />
                        <Form.Field
                            required
                            control={Input}
                            type='password'
                            value={this.state.password}
                            name='password'
                            onChange={this.handleChange}
                            label='Password'
                            placeholder='Enter Password'
                        />
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            <label>Location</label>
                            <Form.Select
                                required
                                value={this.state.emp_location}
                                id='emp_location'
                                placeholder='Select Location'
                                onChange={this.selectChange}
                                options={this.locationOptions}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Organization Role</label>
                            <Form.Select
                                required
                                value={this.state.roles}
                                id='roles'
                                placeholder='Select Role'
                                onChange={this.selectChange}
                                options={this.rolesOptions}
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Button content='Add Employee' />
                </Form>
            </Container>
        );
    }
}

export default AddEmployee;
