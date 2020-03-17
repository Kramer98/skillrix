import React, { Component } from "react";
import { Button, Icon, Container, Header, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchSkills } from "../../actions";
import DisplaySkills from "../DisplaySkills/DisplaySkills";
import axios from "axios";
//REMOVE EDIT OR VIEW SKILLS IF YOUR ARE NOT ABLE TO IMPLEMENT CANCEL
class SkillsPage extends Component {
    state = {
        editActive: {
            state: false,
            index: null,
            newSkill: false,
            newSkillButton: false,
            cancelButton: false
        },
        emp_id: "",
        editActiveSkill: {
            skill_name: "",
            experience: "",
            emp_rating: "",
            man_rating: "",
            skill_approval: false,
            emp_id: localStorage.getItem("emp_id")
        },
        err: ""
    };
    getSkills = async () => {
        const emp_id = localStorage.getItem("emp_id");
        const response = await axios.post(
            `http://localhost:3001/skills/${emp_id}`
        );
        this.setState({
            editSkills: response.data,
            skills: response.data,
            emp_id: emp_id
        });
    };
    componentDidMount() {
        this.getSkills();
    }

    handleChange = (e, index) => {
        this.setState({
            editActiveSkill: {
                ...this.state.editActiveSkill,
                [e.target.name]: e.target.value
            }
        });
    };
    handleCancel = (e, index) => {
        this.setState({
            editActive: {
                state: false,
                index: null,
                newSkill: false,
                newSkillButton: false,
                cancelButton: false
            },
            editActiveSkill: {
                skill_name: "",
                experience: "",
                emp_rating: "",
                man_rating: "",
                skill_approval: false,
                emp_id: this.state.emp_id
            }
        });
    };

    handleEdit = (e, index) => {
        let skill = this.state.skills.slice(index, index + 1);
        this.setState({
            editActive: { state: true, index: index, newSkillButton: true },
            editActiveSkill: { ...skill[0] }
        });
    };

    handleSave = async (e, index) => {
        if (this.validateSkill(this.state.editActiveSkill, "edit")) {
            try {
                const response = await axios.post(
                    `http://localhost:3001/skills/updateskill/${this.state.emp_id}`,
                    { ...this.state.editActiveSkill, skill_approval: false }
                );
                this.setState(
                    {
                        skills: this.state.skills.map((skill, i) => {
                            if (i === index)
                                return {
                                    ...this.state.editActiveSkill,
                                    skill_approval: false
                                };
                            else return skill;
                        }),
                        editActive: {
                            state: false,
                            index: null,
                            newSkillButton: false,
                            newSkill: false
                        },
                        err: ""
                    },
                    () =>
                        this.setState({
                            editActiveSkill: {
                                skill_name: "",
                                experience: "",
                                emp_rating: "",
                                man_rating: "",
                                skill_approval: false,
                                emp_id: this.state.emp_id
                            }
                        })
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    handleChangeNewSkill = (e, index) => {
        console.log("----FROM DROPDOWN----", e.target.value, e);
        console.log("");
        this.setState({
            editActiveSkill: {
                ...this.state.editActiveSkill,
                [e.target.name]: e.target.value
            }
        });
    };
    handleChangeEmpRating = (e, { value }) => {
        console.log("----FROM DROPDOWN----", value, e);
        console.log("");
        this.setState({
            editActiveSkill: {
                ...this.state.editActiveSkill,
                emp_rating: value
            }
        });
    };

    handleAddNewSkill = () => {
        this.setState({
            editActiveSkill: {
                skill_name: "",
                experience: "",
                emp_rating: "",
                man_rating: "",
                skill_approval: false,
                emp_id: localStorage.getItem("emp_id")
            },
            editActive: {
                ...this.state.editActive,
                newSkill: true,
                newSkillButton: true,
                state: true
            }
        });
    };

    handleSaveNewSkill = async (e, index) => {
        if (this.validateSkill(this.state.editActiveSkill)) {
            try {
                const response = await axios.post(
                    "http://localhost:3001/adduser",
                    this.state.editActiveSkill
                );
                this.setState(
                    {
                        skills: [
                            ...this.state.skills,
                            this.state.editActiveSkill
                        ],
                        editActive: {
                            ...this.state.editActive,
                            newSkillButton: false,
                            newSkill: false,
                            state: false
                        },
                        err: ""
                    },
                    () =>
                        this.setState({
                            editActiveSkill: {
                                skill_name: "",
                                experience: "",
                                emp_rating: "",
                                man_rating: "",
                                skill_approval: false,
                                emp_id: this.state.emp_id
                            }
                        })
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    handleDelete = async (e, i) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/skills/deleteskill/${this.state.emp_id}`,
                this.state.skills[i]
            );
            this.setState(
                {
                    skills: this.state.skills.filter(
                        (skill, index) => index !== i
                    )
                },
                () =>
                    this.setState({
                        editActiveSkill: {
                            skill_name: "",
                            experience: "",
                            emp_rating: "",
                            man_rating: "",
                            skill_approval: false,
                            emp_id: this.state.emp_id
                        }
                    })
            );
        } catch (err) {
            console.log(err);
        }
    };

    validateSkill = (skill, mode) => {
        console.log(mode);
        if (
            skill.emp_id === "" ||
            skill.experience === "" ||
            skill.emp_rating === ""
        ) {
            this.setState({ err: "One or more fields are empty" });
            return false;
        }
        let checkSkill = this.state.skills.some(orgSkill => {
            if (orgSkill.skill_name === skill.skill_name) return true;
            else return false;
        });
        console.log(checkSkill);
        if (checkSkill && mode !== "edit") {
            this.setState({ err: "Skill already exists" });
            return false;
        }
        return true;
    };

    render() {
        return (
            <Container>
                <Header as='h2' content='Create/Update Skills' />
                <Button
                    floated='right'
                    icon
                    disabled={this.state.editActive.newSkillButton}
                    onClick={this.handleAddNewSkill}
                    color='blue'
                >
                    <Icon name='add' />
                    &nbsp;Add Skill
                </Button>
                <Divider />
                <DisplaySkills
                    editSkills={this.state.editSkills}
                    skills={this.state.skills || []}
                    onChange={this.handleChange}
                    handleEdit={this.handleEdit}
                    handleSave={this.handleSave}
                    editActive={this.state.editActive}
                    editActiveSkill={this.state.editActiveSkill}
                    handleSaveNewSkill={this.handleSaveNewSkill}
                    handleChangeNewSkill={this.handleChangeNewSkill}
                    handleDelete={this.handleDelete}
                    handleChangeEmpRating={this.handleChangeEmpRating}
                    handleCancel={this.handleCancel}
                />
                {this.state.err}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        skills: state.skills
    };
};

export default connect(mapStateToProps, { fetchSkills })(SkillsPage);
