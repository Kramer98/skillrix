import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class AppHeader extends Component {
    state = {};

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;

        return (
            <Menu>
                <Menu.Item
                    header
                    as={Link}
                    to={
                        localStorage.getItem("manager") === "true"
                            ? "/mhome"
                            : "/ehome"
                    }
                >
                    Skillrix
                </Menu.Item>
                {localStorage.getItem("isAuthenticated") === "true" ? (
                    <>
                        <Menu.Item
                            name='Home'
                            active={activeItem === "Home"}
                            onClick={this.handleItemClick}
                            as={Link}
                            to={
                                localStorage.getItem("manager") === "true"
                                    ? "/mhome"
                                    : "/ehome"
                            }
                        />
                        <Menu.Item
                            name='Skills'
                            active={activeItem === "Skills"}
                            onClick={this.handleItemClick}
                            as={Link}
                            to={"/skills"}
                        />
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='Logout'
                                onClick={this.props.handleLogout}
                            />
                        </Menu.Menu>
                    </>
                ) : (
                    <Menu.Menu position='right'>
                        <Menu.Item name='Login' as={Link} to='/' />
                    </Menu.Menu>
                )}
            </Menu>
        );
    }
}
