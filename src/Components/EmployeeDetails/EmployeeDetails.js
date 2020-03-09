import React from 'react'
import {Container,Header} from 'semantic-ui-react'

const EmployeeDetails=(props)=>{
    return(
    <Container text>
        <Header as='h3'>Your Information</Header>
        <p>
            Name:
        </p>
        <p>
            Address:
        </p>
        <p>
            Active Projects:
        </p>
        <p>
            Manager:
        </p>
        <p>
            Address:
        </p>
    </Container>
    );

}

export default EmployeeDetails