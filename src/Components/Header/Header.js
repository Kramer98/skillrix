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
                <Menu.Item header as={Link} to='/mhome'>
                    Our Company
                </Menu.Item>
                {this.props.isAuthenticated ? (
                    <>
                        <Menu.Item
                            name='Home'
                            active={activeItem === "Home"}
                            onClick={this.handleItemClick}
                            as={Link}
                            to={this.props.userdata.manager ? "mhome" : "ehome"}
                        />
                        <Menu.Item
                            name='Skills'
                            active={activeItem === "skills"}
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
