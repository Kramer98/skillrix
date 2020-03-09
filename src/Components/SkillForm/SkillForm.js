import React,{Component} from 'react'
import {Button} from 'semantic-ui-react'

class SkillForm extends Component{

    renderSkills()
    {
        this.state.skills.map((skill,index)=>{
            return(
                <div key={index}>
                    
                </div>
            );
        })
    }

    render(){
        return(
            <div className='skillForm'>



                <Button secondary>Add Skill</Button>
            </div>
        );

    }


}

export default SkillForm;