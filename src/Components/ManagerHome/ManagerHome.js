import React, { Component } from "react";
import { Grid, Card, Header, GridColumn, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class ManagerHome extends Component {
    state = {
        details: {},
    };
    async getDetails() {
        const response = await axios.post(
            "http://localhost:3001/getUserDeets",
            {
                emp_id: localStorage.getItem("emp_id"),
            }
        );
        this.setState({ details: response.data });
    }
    componentDidMount() {
        this.getDetails();
    }
    render() {
        const emp_id = localStorage.getItem("emp_id");
        const role = localStorage.getItem("role");
        return (
            <Grid>
                <Grid.Row
                    color='blue'
                    style={{ color: "white" }}
                    columns={1}
                    textAlign='left'
                >
                    <Container fluid>
                        <GridColumn>
                            <Header
                                inverted
                                as='h2'
                                style={{ marginLeft: "2%" }}
                            >
                                Hey{" "}
                                {this.state.details.emp_details
                                    ? this.state.details.emp_details.emp_name
                                    : " "}
                                , Welcome to Skillrix
                            </Header>
                            <Header
                                inverted
                                as='h5'
                                style={{ marginLeft: "2%", marginTop: "1%" }}
                            >
                                Employee ID : {emp_id}
                            </Header>
                            <Header
                                inverted
                                as='h5'
                                style={{ marginLeft: "2%", marginTop: "1%" }}
                            >
                                Account :{" "}
                                {this.state.details.emp_details
                                    ? this.state.details.emp_details.account
                                    : " "}
                            </Header>
                            <Header
                                inverted
                                as='h5'
                                style={{ marginLeft: "2%", marginTop: "1%" }}
                            >
                                Reporting Manager :{" "}
                                {this.state.details.manager_details
                                    ? this.state.details.manager_details
                                          .emp_name
                                    : " "}
                            </Header>
                            <Header
                                inverted
                                as='h5'
                                style={{ marginLeft: "2%", marginTop: "1%" }}
                            >
                                Working Location :{" "}
                                {this.state.details.emp_details
                                    ? this.state.details.manager_details
                                          .emp_location
                                    : " "}
                            </Header>
                            <Header
                                inverted
                                as='h5'
                                style={{ marginLeft: "2%", marginTop: "1%" }}
                            >
                                Role : {role[0].toUpperCase() + role.slice(1)}
                            </Header>
                            <Header
                                inverted
                                as='h5'
                                style={{ marginLeft: "2%", marginTop: "1%" }}
                                textAlign='center'
                            >
                                ↓ Please Click on the cards below to use
                                Skillrix ↓
                            </Header>
                        </GridColumn>
                    </Container>
                </Grid.Row>

                <Grid.Row
                    columns={3}
                    textAlign='center'
                    style={{ marginTop: "2%" }}
                >
                    <Grid.Column>
                        <Card
                            centered
                            as={Link}
                            to='/approvals'
                            header='Approvals'
                            meta='Skills'
                            description='Click here to view your employees who are awaiting approval for their skills.'
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            centered
                            as={Link}
                            to='/skills'
                            header='Skills'
                            meta='Create/Update'
                            description='Click here to view,update,delete your personal skills.'
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            centered
                            as={Link}
                            to='/dashboard'
                            header='Dashboard'
                            meta='Stats'
                            description='Click here to view stats for your organisation.'
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2} textAlign='center'>
                    <Grid.Column>
                        <Card
                            centered
                            as={Link}
                            to='/matrix'
                            header='Skill Matrix'
                            meta='Matrix'
                            description='Click here to view your skill matrix/competancy score.'
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Card
                            centered
                            as={Link}
                            to='/employees'
                            header='Your Employees'
                            meta='Employees'
                            description='Click here to rate the skills of all employees working for you.'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default ManagerHome;
