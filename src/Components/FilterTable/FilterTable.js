import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { Header } from "semantic-ui-react";
import "./FilterTable.css";
class FilterTable extends Component {
    state = {
        skills: []
    };

    async getSkills() {
        try {
            const response = await axios.get("http://localhost:3001/skills");
            console.log(response);
            this.setState({ skills: response.data });
        } catch (err) {
            console.log(err);
        }
    }
    componentDidMount() {
        this.getSkills();
    }
    filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id;
        return row[id] !== undefined
            ? String(row[id].toLowerCase()).startsWith(
                  filter.value.toLowerCase()
              )
            : true;
    };
    render() {
        const columns = [
            {
                Header: "Employee ID",
                accessor: "emp_id",
                style: {
                    textAlign: "center"
                },
                filterMethod: this.filterMethod
            },
            {
                Header: "Employee Name",
                accessor: "emp_name",
                style: {
                    textAlign: "center"
                },
                filterMethod: this.filterMethod
            },
            {
                Header: "Location",
                accessor: "emp_location",
                style: {
                    textAlign: "center"
                },
                filterMethod: this.filterMethod
            },
            {
                Header: "Account",
                accessor: "account",
                style: {
                    textAlign: "center"
                },
                filterMethod: this.filterMethod
            },
            {
                Header: "Employee Role",
                accessor: "emp_role",
                style: {
                    textAlign: "center"
                },
                filterMethod: this.filterMethod
            },
            {
                Header: "Skill Name",
                accessor: "skill_name",
                style: {
                    textAlign: "center"
                },
                filterMethod: this.filterMethod
            },
            {
                Header: "Experience",
                accessor: "experience",
                style: {
                    textAlign: "center"
                }
            },
            {
                Header: "Rating",
                accessor: "final_rating",
                style: {
                    textAlign: "center"
                }
            }
        ];
        return (
            <>
                <Header
                    as='h2'
                    content='Entire Organization Data'
                    style={{ marginTop: "2px" }}
                />
                <ReactTable
                    columns={columns}
                    data={this.state.skills}
                    filterable
                    defaultPageSize={10}
                ></ReactTable>
            </>
        );
    }
}

export default FilterTable;
