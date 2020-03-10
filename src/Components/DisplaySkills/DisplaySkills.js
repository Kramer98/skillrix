import React from 'react'
import {Input,Table} from 'semantic-ui-react'

const DisplaySkills=props=>{
    if(props.skills===[])
        return <div>You don't have any added skills yet.</div>
        const skills=props.skills.map((skill,index)=>{
        const disabledRow=skill.skill_approval?'':'disabled'
        return(
            <Table.Row key={index} disabled={disabledRow} textAlign='center'>
                <Table.Cell><Input type='text'  size='mini' name='name' onChange={(e)=>props.onChange(e,index)} value={skill.skill_name[0].toUpperCase()+skill.skill_name.slice(1)}/></Table.Cell>
                <Table.Cell><Input size='mini' name='exp' onChange={(e)=>props.onChange(e,index)} value={skill.experience}/></Table.Cell>
                <Table.Cell><Input size='mini' name='emp_rating' onChange={(e)=>props.onChange(e,index)} value={skill.emp_rating}/></Table.Cell>
                <Table.Cell><Input size='mini' name='man_rating' disabled onChange={(e)=>props.onChange(e,index)} value={skill.man_rating?skill.man_rating:''}/></Table.Cell>
                <Table.Cell>{skill.skill_approval?'Yes':'No'}</Table.Cell>
            </Table.Row>
        );
    })


    return(
            <Table celled>
                <Table.Header>
                    <Table.Row textAlign='center'>
                        <Table.HeaderCell>Skill Name</Table.HeaderCell>
                        <Table.HeaderCell>Experience</Table.HeaderCell>
                        <Table.HeaderCell>Your Rating</Table.HeaderCell>
                        <Table.HeaderCell>Manager Rating</Table.HeaderCell>
                        <Table.HeaderCell>Approved</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {skills}
                </Table.Body>
            </Table>
    );
}

export default DisplaySkills