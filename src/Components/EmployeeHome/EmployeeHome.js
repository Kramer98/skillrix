import React from 'react'
import EmployeeMenu from '../EmployeeMenu/EmployeeMenu'
import EmployeePhoto from '../EmployeePhoto/EmployeePhoto'
import {Grid} from 'semantic-ui-react'
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails'

const EmployeeHome=(props)=>{
    return(
    <Grid>
        <Grid.Column width={4}>
            <EmployeeMenu/>
        </Grid.Column>
        <Grid.Column width={10}>
            <Grid.Row stretched>
                <EmployeePhoto marginBottom={10}/>
            </Grid.Row>
            <Grid.Row stretched>
                <EmployeeDetails/>
            </Grid.Row>
        </Grid.Column>
    </Grid>
    );
}

export default EmployeeHome