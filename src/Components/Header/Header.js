import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class AppHeader extends Component {
    state = {};

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    render() {
        const { activeItem } = this.state;
        const role = localStorage.getItem("role");
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        let home;
        if (role === "manager" && isAuthenticated === "true") home = "/mhome";

        if (role === "admin" && isAuthenticated === "true") home = "/ahome";

        if (role === "employee" && isAuthenticated === "true") home = "/ehome";
        if (isAuthenticated === "false") home = "/";
        console.log("home   ", home);
        return (
            <Menu>
                <Menu.Item header as={Link} to={home}>
                    Skillrix
                </Menu.Item>
                {isAuthenticated === "true" ? (
                    <>
                        <Menu.Item
                            name='Home'
                            active={activeItem === "Home"}
                            onClick={this.handleItemClick}
                            as={Link}
                            to={home}
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
