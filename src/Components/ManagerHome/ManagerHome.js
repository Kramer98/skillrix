import React, { Component } from "react";
import { Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class ManagerHome extends Component {
    state = {
        details: {}
    };
    async getDetails() {
        const response = await axios.post(
            "http://localhost:3001/getUserDeets",
            {
                emp_id: localStorage.getItem("emp_id")
            }
        );
        this.setState({ details: response.data });
    }
    componentDidMount() {
        this.getDetails();
    }
    render() {
        return (
            <Grid>
                <Grid.Row
                    columns={1}
                    textAlign='left'
                    style={{ height: "40%", width: "40%" }}
                >
                    <Grid.Column
                        style={{
                            height: "40%",
                            width: "40%"
                        }}
                    >
                        <Card
                            fluid
                            color='purple'
                            // style={?}
                        >
                            {/* <Card.Content header='Your Details' /> */}

                            <Card.Content
                                style={{
                                    display: "inline-block",
                                    marginBottom: "5%"
                                }}
                            >
                                <Card.Header
                                    textAlign='left'
                                    style={{
                                        marginTop: "1%",
                                        display: "inline-block",
                                        marginLeft: "13%"
                                    }}
                                >
                                    Your Details
                                </Card.Header>
                                <Card.Header
                                    textAlign='right'
                                    style={{
                                        marginTop: "1%",
                                        display: "inline-block",
                                        marginLeft: "51%",
                                        marginRight: "10%",
                                        width: "200px"
                                    }}
                                >
                                    Manager Details
                                </Card.Header>
                                <div
                                    style={{
                                        float: "left",
                                        marginLeft: "10%",
                                        marginTop: "1%",
                                        textAlign: "center",
                                        fontFamily: "Roboto"
                                    }}
                                >
                                    <p>
                                        Employee ID -{" "}
                                        {localStorage.getItem("emp_id")}
                                    </p>
                                    <p>
                                        Employee Name -{" "}
                                        {this.state.details.emp_details !==
                                        undefined
                                            ? this.state.details.emp_details
                                                  .emp_name
                                            : ""}
                                    </p>
                                    <p>
                                        Employee Location -{" "}
                                        {this.state.details.emp_details !==
                                        undefined
                                            ? this.state.details.emp_details
                                                  .emp_location
                                            : ""}
                                    </p>
                                    <p>
                                        Employee Practice -{" "}
                                        {this.state.details.emp_details !==
                                        undefined
                                            ? this.state.details.emp_details
                                                  .practice
                                            : ""}
                                    </p>
                                    <p>
                                        Employee Account -{" "}
                                        {this.state.details.emp_details !==
                                        undefined
                                            ? this.state.details.emp_details
                                                  .account
                                            : ""}
                                    </p>
                                </div>
                                <div
                                    style={{
                                        float: "right",
                                        marginTop: "1%",
                                        marginRight: "12%",
                                        textAlign: "center",
                                        fontFamily: "Roboto"
                                    }}
                                >
                                    <p>
                                        Manager ID -{" "}
                                        {localStorage.getItem("emp_id")}
                                    </p>
                                    <p>
                                        Manager Name -{" "}
                                        {this.state.details.manager_details !==
                                        undefined
                                            ? this.state.details.manager_details
                                                  .emp_name
                                            : ""}
                                    </p>
                                    <p>
                                        Manager Location -{" "}
                                        {this.state.details.manager_details !==
                                        undefined
                                            ? this.state.details.manager_details
                                                  .emp_location
                                            : ""}
                                    </p>
                                </div>
                            </Card.Content>
                        </Card>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row
                    columns={4}
                    textAlign='center'
                    style={{ marginTop: "3%" }}
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
                            to='/table'
                            header='Dashboard'
                            meta='Stats'
                            description='Click here to view stats for your organisation.'
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
                </Grid.Row>
            </Grid>
        );
    }
}

export default ManagerHome;
