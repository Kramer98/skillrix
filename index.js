const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3001;
const db = require("./queries");
const cors = require("cors");

app.use(cors());
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: true,
    })
);

app.get("/", (reqest, response) => {
    response.json({ info: "Node, express and psql" });
});

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});

app.get("/users", db.getusers);
app.post("/getApprovals", db.getApprovals);
app.post("/getEmp", db.getEmp);
app.post("/users/:email", db.getUserById);
app.get("/skills", db.getSkills);
app.post("/skills/:id", db.getSkillById);
app.post("/addskill", db.addSkill);
app.post("/adduser", db.addUserSKill);
app.post("/manager/:emp_id", db.getEmp);
app.post("/skills/updateSkill/:emp_id", db.updateUserSKill);
app.post("/skills/deleteskill/:id", db.deleteData);
app.post("/addNewUser", db.addNewUser);
app.post("/authUser", db.authUser);
app.post("/getUnapprovedSkills/:id", db.getUnapprovedSkillsById);
app.post("/getSkills/:id", db.getSkillsById);
app.post("/skills/getFinalRating/:emp_id", db.getFinalrating);
app.post("/getUserDeets", db.getUserDeets);
app.post("/getSkillApproved", db.getSkillApproved);
app.post("/getAllSkillCount", db.getAllSkillCount);
app.post("/getAvgRatings", db.empRatingVsAvgRating);
app.post("/addNewEmployee", db.addNewEmployee);
app.post("/avgempRatings", db.avgempRatings);
app.post("/getManEmpCount", db.getManEmpCount);
app.post("/getMinMaxSkillsRating", db.getMinMaxSkillsRating);
