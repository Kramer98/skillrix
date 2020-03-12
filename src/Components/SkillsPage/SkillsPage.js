import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchSkills } from "../../actions";
import DisplaySkills from "../DisplaySkills/DisplaySkills";
import axios from "axios";
// import { response } from "express";
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
        this.setState({ viewSkills: response.data, skills: response.data });
    };
    componentDidMount() {
        this.getSkills();
    }

    handleChange = (e, index) => {
        let newSkills = [...this.state.skills];
        let name = e.target.name;
        newSkills[index][name] = e.target.value;
        newSkills[index]["skill_approval"] = false;
        this.setState({
            skills: [...newSkills]
        });
        this.setState({
            editActiveSkill: [newSkills[index]]
        });
    };

    handleEdit = (e, index) => {
        let skill = this.state.skills.slice(index, index + 1);
        this.setState(
            { editActive: { state: true, index: index, newSkillButton: true } },
            () => this.setState({ editActiveSkill: skill })
        );
    };

    handleSave = () => {
        this.setState({ editActive: { state: false, index: null } });
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
            this.setState({
                skills: [...this.state.skills, this.state.editActiveSkill],
                editActive: {
                    ...this.state.editActive,
                    newSkillButton: false,
                    newSkill: false,
                    state: false
                }
            });
            this.setState({
                editActiveSkill: {
                    skill_name: "",
                    experience: "",
                    emp_rating: "",
                    man_rating: "",
                    skill_approval: false
                }
            });
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
                    viewSkills={this.state.viewSkills}
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
