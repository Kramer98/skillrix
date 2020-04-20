import React from "react";

import {
    XYPlot,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    XAxis,
    YAxis,
    DiscreteColorLegend,
} from "react-vis";
import { Header } from "semantic-ui-react";

const DisplayVisualization = ({ data, value }) => {
    console.log("data is ", data);
    if (value === 0) {
        return (
            <div style={{ marginLeft: "30%" }}>
                <XYPlot
                    height={500}
                    width={500}
                    color='#79C7E3'
                    xType='ordinal'
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={data} />
                </XYPlot>
            </div>
        );
    } else if (value === 1) {
        return (
            <div style={{ marginLeft: "30%" }}>
                <XYPlot height={500} width={500} xType='ordinal'>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <DiscreteColorLegend
                        style={{
                            position: "absolute",
                            marginLeft: "-300px",
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
                    <VerticalBarSeries data={data.final_rating} />
                    <VerticalBarSeries data={data.avg_rating} />
                </XYPlot>
            </div>
        );
    } else if (value === 2) {
        return (
            <div style={{ marginLeft: "30%" }}>
                <XYPlot height={500} width={500} xType='ordinal'>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <DiscreteColorLegend
                        style={{
                            position: "absolute",
                            marginLeft: "-300px",
                            top: "10px",
                        }}
                        orientation='vertical'
                        items={[
                            {
                                title: "Your Employee Average Rating",
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
                    <VerticalBarSeries data={data.final_rating} />
                    <VerticalBarSeries data={data.avg_rating} />
                </XYPlot>
            </div>
        );
    } else if (value === 3) {
        return (
            <div style={{ marginLeft: "30%" }}>
                <XYPlot
                    height={500}
                    width={500}
                    xType='ordinal'
                    color='#79C7E3'
                >
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={data} />
                </XYPlot>
            </div>
        );
    } else if (value === 4) {
        return (
            <div style={{ marginLeft: "30%" }}>
                <XYPlot height={500} width={500} xType='ordinal'>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <DiscreteColorLegend
                        style={{
                            position: "absolute",
                            marginLeft: "-300px",
                            top: "10px",
                        }}
                        orientation='vertical'
                        items={[
                            {
                                title: "Your Employee Skill Min Rating",
                                color: "#12939A",
                                strokeWidth: 19,
                            },
                            {
                                title: "Your Employee Skill Max Rating",
                                color: "#79C7E3",
                                strokeWidth: 19,
                            },
                        ]}
                    />
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={data.min_rating} />
                    <VerticalBarSeries data={data.max_rating} />
                </XYPlot>
            </div>
        );
    } else {
        console.log("Value is not zero");
        return <Header textAlign='center'>No visualization selected</Header>;
    }
};

export default DisplayVisualization;
