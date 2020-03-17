import React, { Component } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import DisplayEmployeeApproval from "../DisplayEmployeeApproval/DisplayEmployeeApproval";

class EmployeeApprovalPage extends Component {
    state = {
        approveSkill: {
            skill_name: "",
            experience: "",
            emp_rating: "",
            man_rating: "",
            skill_approval: false,
            emp_id: this.props.emp_id
        },
        man_rating: "",
        skills: []
    };
    getEmployeeSkills = async () => {
        const response = await axios.post(
            `http://localhost:3001/getUnapprovedSkills/${this.props.emp_id}`
        );
        this.setState({
            skills: response.data,
            emp_id: this.props.emp_id
        });
    };

    handleApprove = async (e, index) => {
        try {
            const response = await axios.post(
                `http://localhost:3001/skills/getFinalRating/${this.props.emp_id}`,
                { ...this.state.skills[index], skill_approval: true }
            );
            this.setState({
                skills: this.state.skills.filter((skill, i) => index !== i)
            });
        } catch (err) {
            console.log(err);
        }
    };
    handleChangeManRating = (e, { index, value }) => {
        // console.log(e, data);
        this.setState({
            skills: this.state.skills.map((skill, i) => {
                if (index === i) return { ...skill, man_rating: value };
                else return skill;
            })
        });
    };

    componentDidMount() {
        this.getEmployeeSkills();
    }
    render() {
        return (
            <div>
                <Container>
                    <DisplayEmployeeApproval
                        skills={this.state.skills}
                        approveSkill={this.state.approveSkill}
                        emp_id={this.props.emp_id}
                        handleApprove={this.handleApprove}
                        handleChangeManRating={this.handleChangeManRating}
                    />
                </Container>
            </div>
        );
    }
}

export default EmployeeApprovalPage;
