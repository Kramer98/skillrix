import React, { Component } from "react";
import axios from "axios";
import { Table, Container, Header } from "semantic-ui-react";

class SkillMatrix extends Component {
    state = {
        skills: []
    };
    async getSkills() {
        const response = await axios.post(
            "http://localhost:3001/getSkillApproved",
            { emp_id: localStorage.getItem("emp_id") }
        );
        this.setState({ skills: response.data });
    }
    componentDidMount() {
        this.getSkills();
    }

    render() {
        const renderHeaders = this.state.skills.map(skill => {
            console.log(skill.skill_name);
            return (
                <Table.HeaderCell key={skill.skill_name}>
                    {skill.skill_name}
                </Table.HeaderCell>
            );
        });
        const renderRatings = this.state.skills.map(skill => {
            console.log(skill.skill_name);
            return (
                <Table.Cell key={skill.skill_name}>
                    {skill.final_rating}
                </Table.Cell>
            );
        });

        return (
            <Container textAlign='center'>
                <Header as='h1' content='Skill Matrix' />
                <Table textAlign='center' definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            {renderHeaders}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>Ratings</Table.Cell>
                            {renderRatings}
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default SkillMatrix;
