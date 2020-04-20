import React from "react";
import {
    Header,
    Divider,
    Button,
    Icon,
    Container,
    List,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    return (
        <Container text textAlign='center'>
            <Header as='h2'>Dashboard</Header>
            <Divider />
            <List divided animated celled>
                <List.Item key='table' as={Link} to={`/table`}>
                    <List.Content verticalAlign='middle'>
                        <List.Header>Organization Data Table</List.Header>
                    </List.Content>
                </List.Item>
                <List.Item
                    key='visualizations'
                    as={Link}
                    to={`/visualizations`}
                >
                    <List.Content verticalAlign='middle'>
                        <List.Header>Manager Visualizations</List.Header>
                    </List.Content>
                </List.Item>
            </List>
            <Button as={Link} to='/mhome' color='blue' floated='left'>
                <Icon name='arrow left' size='small' />
                Back To Home
            </Button>
        </Container>
    );
};

export default Dashboard;
