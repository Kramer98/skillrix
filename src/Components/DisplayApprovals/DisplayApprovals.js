import React from "react";
import { List } from "semantic-ui-react";
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
                        {approval.emp_id} - {approval.emp_name}
                    </List.Header>
                </List.Content>
            </List.Item>
        );
    });

    return (
        <List divided animated>
            {renderApprovals}
        </List>
    );
};

export default DisplayApprovals;
