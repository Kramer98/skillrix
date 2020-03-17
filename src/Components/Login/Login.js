import React from "react";
import "./Login.css";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

const Login = ({ handleSubmit, handleChange, loginDetails, err }) => {
    console.log(loginDetails);
    return (
        <Grid
            className='wrapper'
            textAlign='center'
            style={{ height: "93.7vh" }}
            verticalAlign='middle'
        >
            <Grid.Column className='formContent' style={{ maxWidth: 450 }}>
                <Header as='h2' color='black' textAlign='center'>
                    Sign-in
                </Header>
                <Form size='large' onSubmit={e => handleSubmit(e)}>
                    <Segment className='wrapper_segment' stacked>
                        <Form.Input
                            fluid
                            required
                            icon='user'
                            iconPosition='left'
                            placeholder='E-mail address'
                            name='email'
                            value={loginDetails.email}
                            onChange={e => handleChange(e)}
                        />
                        <Form.Input
                            fluid
                            required
                            icon='lock'
                            iconPosition='left'
                            name='password'
                            placeholder='Password'
                            type='password'
                            value={loginDetails.password}
                            onChange={e => handleChange(e)}
                        />
                        <Button className='sign_in_button' fluid size='large'>
                            Login
                        </Button>
                        {err}
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
};

export default Login;
