import React from "react";
import EmployeePhoto from "../EmployeePhoto/EmployeePhoto";
import { Grid, Container, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";

const EmployeeHome = props => {
    return (
        <Container
            className='employeeHomeContainer'
            style={{ width: "90%", marginTop: "3%" }}
        >
            <Grid divided='vertically'>
                <Grid.Row columns={1} textAlign='left'>
                    <Grid.Column>COLUMN2</Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2} textAlign='center'>
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
                            to='/skillmatrix'
                            header='Skill Matrix'
                            meta='Matrix'
                            description='Click here to view your skill matrix/competancy score.'
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default EmployeeHome;
