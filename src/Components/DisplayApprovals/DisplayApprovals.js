import React from "react";
import { List, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const DisplayApprovals = ({ approvals }) => {
    const renderApprovals = approvals.map(approval => {
        return (
            <List.Item
                key={approval.emp_id}
                as={Link}
                to={`/approvals/${approval.emp_id}`}
            >
                <List.Content verticalAlign='middle'>
                    <List.Header>
                        <Icon name='user' />
                        {approval.emp_id} - {approval.emp_name}
                    </List.Header>
                </List.Content>
            </List.Item>
        );
    });

    return (
        <List divided animated celled>
            {approvals.length !== 0
                ? renderApprovals
                : "You don't have any pending approvals"}
        </List>
    );
};

export default DisplayApprovals;
