import React from 'react'
import { Image } from 'semantic-ui-react'
import dummy from '../../images/dummy.jpg'

const EmployeePhoto=(props)=>{
    return(
        <Image src={dummy} size='small' circular />
    );
}

export default EmployeePhoto