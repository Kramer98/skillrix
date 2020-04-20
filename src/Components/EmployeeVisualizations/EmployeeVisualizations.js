import React, { Component } from "react";
import {
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    XAxis,
    YAxis,
    DiscreteColorLegend,
} from "react-vis";
import axios from "axios";
import "../../../node_modules/react-vis/dist/style.css";
import { Container, Header, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class EmployeeVisualizations extends Component {
    state = {
        data: [],
    };
    async componentDidMount() {
        const response = await axios.post(
            "http://localhost:3001/getAvgRatings",
            { emp_id: localStorage.getItem("emp_id") }
        );
        this.setState({
            data: response.data,
        });
    }
    render() {
        return (
            <Container>
                <Header textAlign='center'>
                    Your Skills Rating V/s Avg Employee Rating
                </Header>
                <div style={{ marginLeft: "30%", marginTop: "5%" }}>
                    <XYPlot height={400} width={400} xType='ordinal'>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <DiscreteColorLegend
                            style={{
                                position: "absolute",
                                left: "-300px",
                                top: "10px",
                            }}
                            orientation='vertical'
                            items={[
                                {
                                    title: "Your Rating",
                                    color: "#12939A",
                                    strokeWidth: 19,
                                },
                                {
                                    title: "Avg Employee Rating",
                                    color: "#79C7E3",
                                    strokeWidth: 19,
                                },
                            ]}
                        />
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries
                            data={this.state.data.final_rating}
                        />
                        <VerticalBarSeries data={this.state.data.avg_rating} />
                    </XYPlot>
                </div>
                <Button as={Link} to='/ehome' color='blue' floated='left'>
                    <Icon name='arrow left' size='small' />
                    Back To Home
                </Button>
            </Container>
        );
    }
}
export default EmployeeVisualizations;
