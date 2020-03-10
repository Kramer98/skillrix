import React,{Component} from 'react'
import './Login.css'
import { Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'

class Login extends Component{

render()
{

return(
    <Grid className="wrapper" textAlign='center' style={{ height: '93.7vh' }} verticalAlign='middle'>
      <Grid.Column className="formContent" style={{ maxWidth: 450 }}>
        <Header as='h2' color='black' textAlign='center'>
          Sign-in
        </Header>
        <Form size='large'>
          <Segment className="wrapper_segment" stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
            />
            <Button className="sign_in_button" fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>);
}
}



export default Login