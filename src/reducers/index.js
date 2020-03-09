import {combineReducers} from 'redux'
import skillsReducer from './skillsReducer'


export default combineReducers(
    {
        skills:skillsReducer
    }
)