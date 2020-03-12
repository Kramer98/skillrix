export default (skills = [], action) => {
    switch (action.type) {
        case "FETCH_SKILLS":
            console.log(action.payload);
            return [...skills, ...action.payload];
        case "UPDATE_SKILLS":
            return [];
        case "ADD_SKILL":
            return [...skills, action.payload];
        default:
            return skills;
    }
};
