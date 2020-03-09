import React,{Component} from 'react'
import { Grid,Button, Form,Header } from 'semantic-ui-react'

class Login extends Component{

    constructor (props) {
        super(props);
        this.state = {
          empId: '',
          pass: ''
        };
        this.handleChange = this.handleChange.bind(this);
      }
    
    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    render(){
    return(
        <Grid centered verticalAlign='middle' textAlign='center'>
            <Grid.Column>
        <Form centered size={'small'} widths={'equal'}>
        <Header as='h2' color='teal' textAlign='center'>
            Login
            </Header>
        <Form.Field width={6} required>
          <label>Employee ID</label>
          <input name="empId" placeholder='Employee ID' onChange={this.handleChange} />
        </Form.Field>
        <Form.Field width={6} required>
          <label>Password</label>
          <input name="pass" type='password' placeholder='Password' onChange={this.handleChange} />
        </Form.Field>
        <Button color='olive' type='submit'>Login</Button>
      </Form>
      </Grid.Column>
      </Grid>
    )
    }}


export default Login