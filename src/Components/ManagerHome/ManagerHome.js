import React from "react";
import { Grid, Container, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ManagerHome = props => {
    return (
        <Container
            className='managerHomeContainer'
            style={{ width: "90%", marginTop: "3%" }}
        >
            <Grid divided='vertically'>
                <Grid.Row columns={1} textAlign='left'>
                    <Grid.Column>COLUMN2</Grid.Column>
                </Grid.Row>

                <Grid.Row columns={4} textAlign='center'>
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

export default ManagerHome;
