import React, { Component } from "react";
import { Grid, Card, Container, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";

class AdminHome extends Component {
    render() {
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
                                Hey Admin , Welcome to Skillrix
                            </Header>
                        </Grid.Column>
                    </Container>
                </Grid.Row>
                <Grid.Row
                    columns={1}
                    textAlign='center'
                    style={{ marginTop: "10%" }}
                >
                    <Grid.Column>
                        <Card
                            centered
                            as={Link}
                            to='/addEmp'
                            header='Add New Employee'
                            meta='Add'
                            description='Click here to add a new Employee to your organization.'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default AdminHome;
