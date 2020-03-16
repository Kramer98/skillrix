import React from "react";
import { Input, Table, Button, Icon, Dropdown } from "semantic-ui-react";

const options = [
    {
        key: 1,
        text: "1",
        value: 1
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

const DisplaySkills = ({
    editSkills,
    skills,
    onChange,
    handleEdit,
    handleSave,
    editActive,
    editActiveSkill,
    handleSaveNewSkill,
    handleChangeNewSkill,
    handleDelete,
    handleChangeEmpRating
}) => {
    console.log(editActiveSkill);
    let button = null;
    let row = <Table.Row key='no item'></Table.Row>;
    let disabledRow = editActive.state;
    if (skills.length === 0 && editActive.newSkill === true) {
        row = (
            <Table.Row key={0} textAlign='center'>
                <Table.Cell>
                    <Input
                        size='mini'
                        name='skill_name'
                        onChange={e => handleChangeNewSkill(e)}
                        value={editActiveSkill.skill_name}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Input
                        size='mini'
                        name='experience'
                        type='number'
                        onChange={e => handleChangeNewSkill(e)}
                        value={editActiveSkill.experience}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Dropdown
                        compact
                        name='emp_rating'
                        onChange={handleChangeEmpRating}
                        options={options}
                        selection
                        value={editActiveSkill.emp_rating}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Input
                        size='mini'
                        name='man_rating'
                        type='number'
                        disabled
                        onChange={e => handleChangeNewSkill(e)}
                        value={
                            editActiveSkill.man_rating
                                ? editActiveSkill.man_rating
                                : ""
                        }
                    />
                </Table.Cell>
                <Table.Cell>
                    {editActiveSkill.skill_approval ? "Yes" : "No"}
                </Table.Cell>
                <Table.Cell>
                    <Button
                        icon
                        color='green'
                        onClick={e => handleSaveNewSkill(e)}
                    >
                        <Icon name='save outline' />
                    </Button>
                </Table.Cell>
            </Table.Row>
        );
    }
    const dispSkills =
        skills.length === 0
            ? row
            : skills.map((skill, index) => {
                  if (editActive.state === true && editActive.index === index) {
                      // disabledRow = true;
                      button = (
                          <Button
                              icon
                              color='green'
                              onClick={e => handleSave(e, index)}
                          >
                              <Icon name='save outline'></Icon>
                          </Button>
                      );
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
                                              value={editActiveSkill.skill_name}
                                          />
                                      )}
                                  </Table.Cell>
                                  <Table.Cell>
                                      <Input
                                          size='mini'
                                          name='experience'
                                          onChange={e => onChange(e, index)}
                                          value={editActiveSkill.experience}
                                      />
                                  </Table.Cell>
                                  <Table.Cell>
                                      <Dropdown
                                          compact
                                          name='emp_rating'
                                          onChange={handleChangeEmpRating}
                                          options={options}
                                          selection
                                          value={editActiveSkill.emp_rating}
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
                                              editActiveSkill.man_rating
                                                  ? editActiveSkill.man_rating
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
                      button = (
                          <>
                              <Button
                                  icon
                                  onClick={e => handleEdit(e, index)}
                                  color='grey'
                              >
                                  <Icon name='edit outline'></Icon>
                              </Button>
                              <Button
                                  icon
                                  onClick={e => handleDelete(e, index)}
                                  color='red'
                              >
                                  <Icon name='trash alternate outline'></Icon>
                              </Button>
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
                              <Table.Row key={index + 1} textAlign='center'>
                                  <Table.Cell>
                                      <Input
                                          size='mini'
                                          name='skill_name'
                                          onChange={e =>
                                              handleChangeNewSkill(e, index)
                                          }
                                          value={editActiveSkill.skill_name}
                                      />
                                  </Table.Cell>
                                  <Table.Cell>
                                      <Input
                                          size='mini'
                                          name='experience'
                                          type='number'
                                          onChange={e =>
                                              handleChangeNewSkill(e, index)
                                          }
                                          value={editActiveSkill.experience}
                                      />
                                  </Table.Cell>
                                  <Table.Cell>
                                      <Dropdown
                                          compact
                                          name='emp_rating'
                                          onChange={handleChangeEmpRating}
                                          options={options}
                                          selection
                                          value={editActiveSkill.emp_rating}
                                      />
                                  </Table.Cell>
                                  <Table.Cell>
                                      <Input
                                          size='mini'
                                          name='man_rating'
                                          type='number'
                                          disabled
                                          onChange={e =>
                                              handleChangeNewSkill(e, index)
                                          }
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
                                          color='green'
                                          icon
                                          onClick={e =>
                                              handleSaveNewSkill(e, index)
                                          }
                                      >
                                          <Icon name='save outline'></Icon>
                                      </Button>
                                  </Table.Cell>
                              </Table.Row>
                          </>
                      );
                  } else {
                      button = (
                          <>
                              <Button
                                  icon
                                  onClick={e => handleEdit(e, index)}
                                  color='grey'
                              >
                                  <Icon name='edit outline'></Icon>
                              </Button>
                              <Button
                                  icon
                                  onClick={e => handleDelete(e, index)}
                                  color='red'
                              >
                                  <Icon name='trash alternate outline'></Icon>
                              </Button>
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
            <Table.Body>
                {dispSkills ? (
                    dispSkills
                ) : (
                    <Table.Row>
                        <Table.Cell>
                            "You Don't have any Skills added yet. Please add
                            bro"
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    );
};

export default DisplaySkills;
