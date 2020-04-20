import React from "react";
import { List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DisplayEmployees = ({ employees }) => {
    const renderEmployees = employees.map(employee => {
        return (
            <List.Item
                key={employee.emp_id}
                as={Link}
                to={`/employees/${employee.emp_id}`}
            >
                <List.Content verticalAlign='middle'>
                    <List.Header>
                        <Icon name='user' />
                        {employee.emp_id} - {employee.emp_name}
                    </List.Header>
                </List.Content>
            </List.Item>
        );
    });

    return (
        <List divided animated celled>
            {employees.length !== 0
                ? renderEmployees
                : "You don't have any employees"}
        </List>
    );
};

export default DisplayEmployees;
