import React, { Component } from "react";
import axios from "axios";
import { Container, Header, Divider } from "semantic-ui-react";

import DisplayApprovals from "../DisplayApprovals/DisplayApprovals";

class ApprovalsPage extends Component {
    state = {
        approvals: [],
        mgr_id: localStorage.getItem("emp_id")
    };
    async getApprovals() {
        const response = await axios.post(
            `http://localhost:3001/getApprovals`,
            {
                emp_id: this.state.mgr_id
            }
        );
        this.setState({ approvals: response.data });
    }
    componentDidMount() {
        this.getApprovals();
    }
    render() {
        return (
            <Container text textAlign='center'>
                <Header as='h2'>Your Pending Employee Skill Approvals</Header>
                <Divider />
                <DisplayApprovals approvals={this.state.approvals} />
            </Container>
        );
    }
}

export default ApprovalsPage;
