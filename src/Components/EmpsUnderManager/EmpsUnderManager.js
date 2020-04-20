import React, { Component } from "react";
import axios from "axios";
import { Container, Header, Divider, Button, Icon } from "semantic-ui-react";

import { Link } from "react-router-dom";
import DisplayEmployees from "../DisplayEmployees/DisplayEmployees";

class EmpsUnderManager extends Component {
    state = {
        employees: [],
        mgr_id: localStorage.getItem("emp_id")
    };
    async getEmployees() {
        const response = await axios.post(`http://localhost:3001/getEmp`, {
            emp_id: this.state.mgr_id
        });
        this.setState({ employees: response.data });
    }
    componentDidMount() {
        this.getEmployees();
    }
    render() {
        return (
            <Container text textAlign='center'>
                <Header as='h2'>Employees Working Under You</Header>
                <Divider />
                <DisplayEmployees employees={this.state.employees} />
                <Button as={Link} to='/mhome' color='blue' floated='left'>
                    <Icon name='arrow left' size='small' />
                    Back To Home
                </Button>
            </Container>
        );
    }
}

export default EmpsUnderManager;
