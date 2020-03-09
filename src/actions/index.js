import axios from 'axios'

export const fetchSkills =()=> async dispatch=>{
    const response=await axios.post('http://localhost:3001/skills/T0004')
    console.log(response)
    dispatch( {
        type:'FETCH_SKILLS',
        payload:response.data
    });
};

export const updateSkills=(index)=>{
    return {
        type:'UPDATE_SKILL',
        payload:index
    }
}