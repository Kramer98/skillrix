import React from 'react'
import {Menu} from 'semantic-ui-react'
import {Link} from 'react-router-dom'


const EmployeeMenu=()=>{

    return(
        <div>
            <Menu vertical>
                <Menu.Item as={Link} to='/ehome'>
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to='/skills'>Skills</Menu.Item>
                <Menu.Item as={Link} to='/mng_det'>Your Manager</Menu.Item>
                <Menu.Item as={Link} to='/skill_matrix'>Skill Matrix</Menu.Item>
            </Menu>
        </div>
    );
}

export default EmployeeMenu