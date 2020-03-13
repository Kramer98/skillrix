const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const port = 3001;
const db = require("./queries");
const cors = require("cors");

app.use(cors());
// app.use()
app.use(bodyparser.json());
app.use(
    bodyparser.urlencoded({
        extended: true
    })
);

app.get("/", (reqest, response) => {
    response.json({ info: "Node, express and psql" });
});

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});

app.get("/users", db.getusers);
app.post("/users/:email", db.getUserById);
app.get("/skills/", db.getSkills);
app.post("/skills/:id", db.getSkillById);
app.post("/addskill", db.addSkill);
app.post("/adduser", db.addUserSKill);
app.post("/manager/:emp_id", db.getEmp);
app.post("/manager/ski/:emp_id", db.getApproval);
app.post("/skills/updateSkill/:emp_id", db.updateUserSKill);
app.post('/skills/deleteskill/:id',db.deleteData)