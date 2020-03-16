import React from "react";
import { Table, Header, Dropdown, Button, Icon } from "semantic-ui-react";

const options = [
    {
        key: 1,
        text: "1",
        value: "1"
    },
    {
        key: 2,
        text: "2",
        value: 2
    },
    {
        key: 3,
        text: "3",
        value: 3
    },
    {
        key: 4,
        text: "4",
        value: 4
    },
    {
        key: 5,
        text: "5",
        value: 5
    },
    {
        key: 6,
        text: "6",
        value: 6
    },
    {
        key: 7,
        text: "7",
        value: 7
    },
    {
        key: 8,
        text: "8",
        value: 8
    },
    {
        key: 9,
        text: "9",
        value: 9
    },
    {
        key: 10,
        text: "10",
        value: 10
    }
];

const DisplayEmployeeApproval = ({
    skills,
    emp_id,
    handleChangeManRating,
    handleApprove,
    approveSkill
}) => {
    const renderPending = skills.map((skill, index) => {
        return (
            <Table.Row key={index} textAlign='center'>
                <Table.Cell>{skill.skill_name}</Table.Cell>
                <Table.Cell>{skill.experience}</Table.Cell>
                <Table.Cell>{skill.emp_rating}</Table.Cell>
                <Table.Cell>
                    <Dropdown
                        compact
                        name='man_rating'
                        index={index}
                        onChange={handleChangeManRating}
                        options={options}
                        selection
                        value={skill.man_rating || approveSkill.man_rating}
                    />
                </Table.Cell>
                <Table.Cell>{skill.skill_approval ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>
                    <Button
                        icon
                        onClick={e => handleApprove(e, index)}
                        color='green'
                    >
                        <Icon name='check'></Icon>
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    });
    return (
        <>
            <Header as='h2' content={"Employee ID: " + emp_id} />
            <Header as='h3' content='Click on ✔ to approve employee skill' />
            <Table color='red'>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>Skill Name</Table.HeaderCell>
                        <Table.HeaderCell>Experience</Table.HeaderCell>
                        <Table.HeaderCell>Employee Rating</Table.HeaderCell>
                        <Table.HeaderCell>Manager Rating</Table.HeaderCell>
                        <Table.HeaderCell>Approved</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>{renderPending}</Table.Body>
            </Table>
        </>
    );
};

export default DisplayEmployeeApproval;
