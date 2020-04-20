import React, { Component } from "react";
import { Grid, Card, Header, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class EmployeeHome extends Component {
    state = {
        details: {},
    };
    async getDetails() {
        console.log(localStorage.getItem("emp_id"), " in emp home");
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
                        <Grid.Column>
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
                        </Grid.Column>
                    </Container>
                </Grid.Row>

                <Grid.Row
                    columns={3}
                    textAlign='center'
                    style={{ marginTop: "5%" }}
                >
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
                            to='/evisualizations'
                            header='Visualizations'
                            meta='Charts'
                            description='Click here to compare your skill with the rest of the organization'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            // </Container>
        );
    }
}

export default EmployeeHome;
