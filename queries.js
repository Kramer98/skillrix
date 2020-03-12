const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Skillrix",
    password: "Ashish@007",
    port: 5432
});
const getusers = (request, response) => {
    pool.query("select emp_name from Employee_details", (error, results) => {
        if (error) {
            //console.log("i m breaking here at get")
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const { email } = req.params;
    // console.log("-------------req.params------------", req.params)
    // console.log("----------req.query---------", req.query)
    // console.log(id)
    pool.query(
        "select emp_name from Employee_details where email= $1",
        [email],
        (error, results) => {
            if (error) {
                console.log(error);
            }
            console.log(results);
            res.status(200).json(results.rows);
        }
    );
};

const getSkills = (req, res) => {
    pool.query("select * from Employee_skills", (error, results) => {
        if (error) {
            console.log(results);
        }
        res.status(200).json(results.rows);
    });
};

const getSkillById = (req, res) => {
    const { id } = req.params;
    console.log(id);
    //    pool.query('select skill_name,experience,emp_rating,man_rating,skill_approval from Employee_Skills where emp_id = (select emp_id from Employee_details where email= $1' [id],(error,results) => {
    pool.query(
        "select skill_name,experience,emp_rating,man_rating,skill_approval from Employee_Skills where emp_id = $1",
        [id],
        (error, results) => {
            if (error) {
                console.log(error);
            }
            res.status(200).json(results.rows);
        }
    );
};

const addSkill = (req, res) => {
    const { skill_name } = req.body;
    console.log(skill_name);
    pool.query(
        "insert into skills (skill_name) values ($1)",
        [skill_name],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(
                `Employee added with ID : ${results.insertId}`
            );
        }
    );
};

const addUserSKill = (req, res) => {
    console.log(req.body);
    const {
        emp_id,
        skill_name,
        experience,
        emp_rating,
        man_rating,
        skill_approval
    } = req.body;
    console.log(emp_id);
    pool.query(
        "insert into Employee_skills (emp_id,skill_name,experience,emp_rating,man_rating,skill_approval) values ($1,$2,$3,$4,$5,$6)",
        [
            emp_id,
            skill_name,
            parseInt(experience),
            parseInt(emp_rating),
            parseInt(man_rating) || null,
            skill_approval
        ],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(201).send(
                `Employee added with ID : ${results.insertId}`
            );
        }
    );
};

const getEmp = (req, res) => {
    const { emp_id } = req.params;
    console.log(emp_id);
    pool.query(
        "select emp_name from Employee_details where manager_id = $1",
        [emp_id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
};

const updateUserSKill = (req,res) => 
{
    const {emp_id} = req.params;
    const {skill_name,experience,emp_rating,man_rating,skill_approval } = req.body
    console.log(emp_id)
    pool.query('UPDATE Employee_skills set skill_name = $2, experience = $3, emp_rating = $4 , man_rating = $5, skill_approval = $6 WHERE emp_id = $1',[emp_id,skill_name,parseInt(experience),parseInt(emp_rating),parseInt(man_rating),skill_approval],(error,results) => {
        if(error)
        {
            throw error;
            
        }
        res.status(201).send(`Employee added with ID : ${results.insertId}`)


    })
}
const getApproval=(req,res) =>
{
    const {emp_id} = req.params;
    pool.query('select * from Employee_skills where manager_id = $1 and approval = False',[emp_id],(error,results) =>
    {
        if(error)
        {
            throw error;
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getusers,
    getUserById,
    getSkills,
    getSkillById,
    addSkill,
    addUserSKill,
    getEmp,
    getApproval,
    getUserById,
};
