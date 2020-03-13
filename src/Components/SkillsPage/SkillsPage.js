import React, { Component } from "react";
import { Button } from "semantic-ui-react";
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
            newSkillButton: false
        },
        editActiveSkill: {
            skill_name: "",
            experience: "",
            emp_rating: "",
            man_rating: "",
            skill_approval: false,
            emp_id: "T0004"
        }
    };
    getSkills = async () => {
        const response = await axios.post("http://localhost:3001/skills/T0004");
        this.setState({ editSkills: response.data, skills: response.data });
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

    handleEdit = (e, index) => {
        let skill = this.state.skills.slice(index, index + 1);
        this.setState({
            editActive: { state: true, index: index, newSkillButton: true },
            editActiveSkill: { ...skill[0] }
        });
    };

    handleSave = async (e, index) => {
        console.log("====================SAVING===============");
        console.log(index);
        try {
            const response = await axios.post(
                "http://localhost:3001/skills/updateskill/T0004",
                this.state.editActiveSkill
            );
            console.log(response);
            let newSkills = [...this.state.editSkills];
            newSkills[index] = this.state.editActiveSkill;
            this.setState(
                {
                    skills: [...newSkills],
                    editActive: {
                        ...this.state.editActive,
                        state: false,
                        index: null,
                        newSkillButton: false,
                        newSkill: false
                    }
                },
                () =>
                    this.setState({
                        editActiveSkill: {
                            skill_name: "",
                            experience: "",
                            emp_rating: "",
                            man_rating: "",
                            skill_approval: false
                        }
                    })
            );
        } catch (error) {
            console.log(error);
        }
    };

    handleChangeNewSkill = (e, index) => {
        console.log(
            "__________e_________",
            e.target.name,
            e.target.value,
            index
        );
        this.setState({
            editActiveSkill: {
                ...this.state.editActiveSkill,
                [e.target.name]: e.target.value
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
                emp_id: "T0004"
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
        try {
            const response = await axios.post(
                "http://localhost:3001/adduser",
                this.state.editActiveSkill
            );
            this.setState(
                {
                    skills: [...this.state.skills, this.state.editActiveSkill],
                    editActive: {
                        ...this.state.editActive,
                        newSkillButton: false,
                        newSkill: false,
                        state: false
                    }
                },
                () =>
                    this.setState({
                        editActiveSkill: {
                            skill_name: "",
                            experience: "",
                            emp_rating: "",
                            man_rating: "",
                            skill_approval: false
                        }
                    })
            );
        } catch (error) {
            console.log(error);
        }
    };

    handleDelete = (e, i) => {
        this.setState({
            skills: this.state.skills.filter((skill, index) => index !== i)
        });
    };

    render() {
        return (
            <div className='skillsPage'>
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
                />
                <Button
                    secondary
                    disabled={this.state.editActive.newSkillButton}
                    onClick={this.handleAddNewSkill}
                >
                    Add Skill
                </Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        skills: state.skills
    };
};

export default connect(mapStateToProps, { fetchSkills })(SkillsPage);
