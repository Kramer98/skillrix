import React from "react";
import { Input, Table, Button } from "semantic-ui-react";

const DisplaySkills = ({
    viewSkills,
    skills,
    onChange,
    handleEdit,
    handleSave,
    editActive,
    editActiveSkill,
    handleSaveNewSkill,
    handleChangeNewSkill,
    handleDelete
}) => {
    console.log("===========PROPS===========", editActiveSkill);

    let button = null;
    let row = <Table.Row key='no item'></Table.Row>;
    let disabledRow = editActive.state;
    if (viewSkills === undefined)
        return <div>You don't have any added skills yet.</div>;
    const dispSkills = skills.map((skill, index) => {
        if (editActive.state === true && editActive.index === index) {
            // disabledRow = true;
            button = <Button content='Save' onClick={handleSave} primary />;
            row = (
                <>
                    <Table.Row
                        key={index}
                        disabled={!disabledRow}
                        textAlign='center'
                    >
                        <Table.Cell>
                            {skill.skill_name[0].toUpperCase() +
                                skill.skill_name.slice(1) || (
                                <Input
                                    size='mini'
                                    name='skill_name'
                                    onChange={e => onChange(e, index)}
                                    value={skills[index].skill_name}
                                />
                            )}
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                size='mini'
                                name='experience'
                                onChange={e => onChange(e, index)}
                                value={skills[index].experience}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                size='mini'
                                name='emp_rating'
                                type='number'
                                min={0}
                                max={10}
                                onChange={e => onChange(e, index)}
                                value={skills[index].emp_rating}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                size='mini'
                                name='man_rating'
                                type='number'
                                disabled
                                onChange={e => onChange(e, index)}
                                value={
                                    skills[index].man_rating
                                        ? skills[index].man_rating
                                        : ""
                                }
                            />
                        </Table.Cell>
                        <Table.Cell>
                            {skills.skill_approval ? "Yes" : "No"}
                        </Table.Cell>
                        <Table.Cell>{button}</Table.Cell>
                    </Table.Row>
                </>
            );
        } else if (
            editActive.newSkill === true &&
            index === skills.length - 1
        ) {
            row = (
                <>
                    <Table.Row
                        key={index}
                        disabled={disabledRow}
                        textAlign='center'
                    >
                        <Table.Cell>
                            {skill.skill_name[0].toUpperCase() +
                                skill.skill_name.slice(1)}
                        </Table.Cell>
                        <Table.Cell>{skill.experience}</Table.Cell>
                        <Table.Cell>{skill.emp_rating}</Table.Cell>
                        <Table.Cell>
                            {skill.man_rating ? skill.man_rating : ""}
                        </Table.Cell>
                        <Table.Cell>
                            {skill.skill_approval ? "Yes" : "No"}
                        </Table.Cell>
                        <Table.Cell>{button}</Table.Cell>
                    </Table.Row>
                    <Table.Row key={index + 1} textAlign='center'>
                        <Table.Cell>
                            <Input
                                size='mini'
                                name='skill_name'
                                onChange={e => handleChangeNewSkill(e, index)}
                                value={editActiveSkill.skill_name}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                size='mini'
                                name='experience'
                                type='number'
                                onChange={e => handleChangeNewSkill(e, index)}
                                value={editActiveSkill.experience}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                size='mini'
                                name='emp_rating'
                                type='number'
                                min={0}
                                max={10}
                                onChange={e => handleChangeNewSkill(e, index)}
                                value={editActiveSkill.emp_rating}
                            />
                        </Table.Cell>
                        <Table.Cell>
                            <Input
                                size='mini'
                                name='man_rating'
                                type='number'
                                disabled
                                onChange={e => handleChangeNewSkill(e, index)}
                                value={
                                    editActiveSkill.man_rating
                                        ? editActiveSkill.man_rating
                                        : ""
                                }
                            />
                        </Table.Cell>
                        <Table.Cell>
                            {skill.skill_approval ? "Yes" : "No"}
                        </Table.Cell>
                        <Table.Cell>
                            <Button
                                content='Save New Skill'
                                onClick={e => handleSaveNewSkill(e, index)}
                            />
                        </Table.Cell>
                    </Table.Row>
                </>
            );
        } else {
            button = (
                <>
                    <Button
                        content='Edit'
                        onClick={e => handleEdit(e, index)}
                        primary
                    />
                    <Button
                        content='Delete'
                        onClick={e => handleDelete(e, index)}
                        secondary
                    />
                </>
            );
            row = (
                <>
                    <Table.Row
                        key={index}
                        disabled={disabledRow}
                        textAlign='center'
                    >
                        <Table.Cell>
                            {skill.skill_name[0].toUpperCase() +
                                skill.skill_name.slice(1)}
                        </Table.Cell>
                        <Table.Cell>{skill.experience}</Table.Cell>
                        <Table.Cell>{skill.emp_rating}</Table.Cell>
                        <Table.Cell>
                            {skill.man_rating ? skill.man_rating : ""}
                        </Table.Cell>
                        <Table.Cell>
                            {skill.skill_approval ? "Yes" : "No"}
                        </Table.Cell>
                        <Table.Cell>{button}</Table.Cell>
                    </Table.Row>
                </>
            );
        }
        return row;
    });
    return (
        <Table celled>
            <Table.Header>
                <Table.Row textAlign='center'>
                    <Table.HeaderCell>Skill Name</Table.HeaderCell>
                    <Table.HeaderCell>Experience</Table.HeaderCell>
                    <Table.HeaderCell>Your Rating</Table.HeaderCell>
                    <Table.HeaderCell>Manager Rating</Table.HeaderCell>
                    <Table.HeaderCell>Approved</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>{dispSkills}</Table.Body>
        </Table>
    );
};

export default DisplaySkills;
