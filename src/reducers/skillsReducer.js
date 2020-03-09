export default (skills=[],action)=>{
    console.log(action)
    switch(action.type)
    {
        case 'FETCH_SKILLS':
            return [...skills,...action.payload]
        case 'UPDATE_SKILLS':
            return []
        default:
            return skills
    }
}