import axios from "axios";

export const fetchSkills = () => async dispatch => {
    const response = await axios.post("http://localhost:3001/skills/T0004");
    dispatch({
        type: "FETCH_SKILLS",
        payload: response.data
    });
};

export const updateSkills = data => async dispatch => {
    const response = await axios.post("http://localhost:3001/adduser");
    dispatch({
        type: "UPDATE_SKILL",
        payload: response.data
    });
};
