import React from 'react'
import EmployeePhoto from '../EmployeePhoto/EmployeePhoto'
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails'
import { Grid, Image } from 'semantic-ui-react'
import { Card, Icon,  } from 'semantic-ui-react'
import './EmployeeHome.css'; 
import SkillsCard from '../SkillsCard/SkillsCard'
import SkillMatrix from '../SkillMatrix/SkillMatrix'
const description = [
    'Amy is a violinist with 2 years experience in the wedding industry.',
    'She enjoys the outdoors and currently resides in upstate New York.',
  ].join(' ')


const EmployeeHome=(props)=>{
    return(
    
        <Grid divided='vertically'>
        <Grid.Row columns={3}>
          <Grid.Column className='intro'>
                <EmployeeDetails/>
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
          </Grid.Column>
          <Grid.Column>
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
          </Grid.Column>
        </Grid.Row>
    
        <Grid.Row columns={3}>
          <Grid.Column>
          <Card>
    <Card.Content header='About Me' />
    <Card.Content description={description}  />
    <Card.Content extra>
      <Icon name='user' />4 Friends
    </Card.Content>
  </Card>
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
          </Grid.Column>
          <Grid.Column>
<SkillsCard/>
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
          </Grid.Column>
          <Grid.Column>
         
  <SkillMatrix/>
            {/* <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' /> */}
          </Grid.Column>
        </Grid.Row>
    </Grid>
    );
}

export default EmployeeHome