import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class AppHeader extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu>
        <Menu.Item header as={Link} to='/mhome'>Our Company</Menu.Item>
        <Menu.Item
          name='Home'
          active={activeItem === 'aboutUs'}
          onClick={this.handleItemClick}
          as={Link}
          to='/ehome'
        />
        <Menu.Menu position='right'>
        <Menu.Item
          name='Login'
          as={Link}
          to='/'
        />
        </Menu.Menu>
        </Menu>
      
    )
  }
}