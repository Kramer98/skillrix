import React from 'react'
import EmployeePhoto from '../EmployeePhoto/EmployeePhoto'
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails'
import {Grid} from 'semantic-ui-react'


const ManagerHome=(props)=>{
    return(
    <Grid>
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

export default ManagerHome