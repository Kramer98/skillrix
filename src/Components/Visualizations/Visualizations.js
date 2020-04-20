import React, { Component } from "react";
import axios from "axios";
import "../../../node_modules/react-vis/dist/style.css";
import DisplayVisualization from "../DisplayVisualization/DisplayVisualization";
import { Container, Dropdown, Header } from "semantic-ui-react";

class Visualizations extends Component {
    state = {
        data: [],
        option: { text: "Please Select A Visualization", key: null },
    };
    options = [
        {
            key: 0,
            text: "Bar Chart: All Skills",
            value: 0,
        },
        {
            key: 1,
            text: "Bar Chart: Your Rating V/s Avg Emp Rating",
            value: 1,
        },
        {
            key: 2,
            text:
                "Bar Chart: Your Employee Avg Rating V/s Organization Avg Emp Rating",
            value: 2,
        },
        {
            key: 3,
            text: "Bar Chart: Count of skills held by your employees",
            value: 3,
        },
        {
            key: 4,
            text: "Bar Chart: Min & Max Skill rating of your employees",
            value: 4,
        },
    ];
    handleVisualChange = async (e, { value }) => {
        console.log(e, "     FROM DROPDOWN    ", value, this.options[value]);
        if (value === 0) {
            const response = await axios.post(
                "http://localhost:3001/getAllSkillCount"
            );
            this.setState({
                data: response.data,
                option: { text: this.options[value].text, key: value },
            });
        }
        if (value === 1) {
            const response = await axios.post(
                "http://localhost:3001/getAvgRatings",
                { emp_id: localStorage.getItem("emp_id") }
            );
            this.setState({
                data: response.data,
                option: { text: this.options[value].text, key: value },
            });
        }
        if (value === 2) {
            const response = await axios.post(
                "http://localhost:3001/avgempRatings",
                { manager_id: localStorage.getItem("emp_id") }
            );
            console.log(response.data);
            this.setState({
                data: response.data,
                option: { text: this.options[value].text, key: value },
            });
        }
        if (value === 3) {
            const response = await axios.post(
                "http://localhost:3001/getManEmpCount",
                { manager_id: localStorage.getItem("emp_id") }
            );
            console.log(response.data);
            this.setState({
                data: response.data,
                option: { text: this.options[value].text, key: value },
            });
        }
        if (value === 4) {
            const response = await axios.post(
                "http://localhost:3001/getMinMaxSkillsRating",
                { manager_id: localStorage.getItem("emp_id") }
            );
            console.log(response.data);
            this.setState({
                data: response.data,
                option: { text: this.options[value].text, key: value },
            });
        }
    };

    render() {
        const { value } = this.state.option.text;
        return (
            <Container>
                <Header size='huge' textAlign='center'>
                    Visualizations
                </Header>
                <Header as='h4'>Select a visualization:</Header>
                <Dropdown
                    required
                    compact
                    name='visual_list'
                    placeholder='Please Choose A Visualization'
                    onChange={this.handleVisualChange}
                    options={this.options}
                    selection
                    value={value}
                    labeled='Select A Visualization'
                />
                <DisplayVisualization
                    data={this.state.data}
                    value={this.state.option.key}
                />
            </Container>
        );
    }
}

export default Visualizations;
