import React,{Component} from 'react'
import {Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import { fetchSkills } from '../../actions'
import DisplaySkills from '../DisplaySkills/DisplaySkills'
import skillrix from '../../api/skillrix'
import axios from 'axios'

class SkillsPage extends Component{

    handleChange=(e,index)=>{
        console.log('____________e____',e)
        console.log(index)
    }

    // getSkills= async ()=>{

    //     const response=await skillrix.post('/skills/T0001')
    //     return response
        
    // }

    componentDidMount()
    {
        // this.getSkills()
        // axios.get('http://localhost:3001/').then(res=>{
        //     console.log(res)
        // })
        this.props.fetchSkills()
    }

    render(){
        return(
            <div className='skillsPage'>
                <DisplaySkills skills={this.props.skills} onChange={this.handleChange} /> 
                <Button secondary>Add Skill</Button>
          </div>
        );

    }


}

const mapStateToProps=(state)=>{
    console.log(state)
    return {
        skills:state.skills
    }
}

export default connect(mapStateToProps,{fetchSkills})(SkillsPage);