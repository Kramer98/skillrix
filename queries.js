const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Skillrix",
    password: "root",
    port: 5432
});
const getusers = (request, response) => {
    pool.query("select emp_name from Employee_details", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const { email } = req.params;
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
            parseFloat(experience),
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

const updateUserSKill = (req, res) => {
    const { emp_id } = req.params;
    console.log(req.body);
    const {
        skill_name,
        experience,
        emp_rating,
        man_rating,
        skill_approval
    } = req.body;
    console.log(emp_id);
    pool.query(
        "UPDATE Employee_skills set experience = $3, emp_rating = $4 , man_rating = $5, skill_approval = $6 WHERE emp_id = $1 AND skill_name=$2",
        [
            emp_id,
            skill_name,
            parseFloat(experience),
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

const deleteData = (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { skill_name } = req.body;
    pool.query(
        "delete from Employee_skills where emp_id = $1 and skill_name = $2",
        [id, skill_name],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).send(`User deleted with ID: ${id}`);
        }
    );
};

const addNewUser = (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hashedPassword) {
        if (err) {
            throw err;
        } else {
            pool.query(
                "insert into employee_auth (email,password) values ($1,$2)",
                [email, hashedPassword],
                (error, results) => {
                    if (error) {
                        throw error;
                    } else {
                        console.log(results);
                        res.status(201).send(
                            `Employee added with ID : ${results.email}`
                        );
                    }
                }
            );
        }
    });
};

const authUser = (req, res) => {
    const { email, password } = req.body;
    pool.query(
        "SELECT * FROM EMPLOYEE_AUTH WHERE email=$1",
        [email],
        (error, results) => {
            if (error) {
                throw error;
            } else {
                console.log(results.rows);
                if (results.rowCount === 0)
                    res.status(201).json({ err: `User Not Found` });
                else {
                    bcrypt.compare(
                        password,
                        results.rows[0].password,
                        (err, result) => {
                            if (result === true) {
                                pool.query(
                                    "SELECT emp_id,manager,emp_name from employee_details WHERE email=$1",
                                    [email],
                                    (err, results) => {
                                        if (err) throw err;
                                        else {
                                            res.status(201).json({
                                                err: null,
                                                data: results.rows[0]
                                            });
                                        }
                                    }
                                );
                            } else
                                res.status(201).json({
                                    err: `Invalid Password`
                                });
                        }
                    );
                }
            }
        }
    );
};

const getApprovals = (req, res) => {
    const { emp_id } = req.body;
    console.log(req.body);
    pool.query(
        "select DISTINCT emp_id,emp_name from employee_Skills natural join employee_details where manager_id = $1 and skill_approval = false",
        [emp_id],
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};

const getUnapprovedSkillsById = (req, res) => {
    const { id } = req.params;
    console.log(id);
    //    pool.query('select skill_name,experience,emp_rating,man_rating,skill_approval from Employee_Skills where emp_id = (select emp_id from Employee_details where email= $1' [id],(error,results) => {
    pool.query(
        "select skill_name,experience,emp_rating,man_rating,skill_approval from Employee_Skills where emp_id = $1 and skill_approval=false",
        [id],
        (error, results) => {
            if (error) {
                console.log(error);
            }
            res.status(200).json(results.rows);
        }
    );
};

const getFinalrating = (req,res) =>
{
   // const {id} = req.params;
    const {emp_id,skill_name} = req.body;
    pool.query('update employee_skills set final_rating = (emp_rating + man_rating) / 2 where emp_id = $1 and skill_name = $2',[emp_id,skill_name],(error,results)=>
    {
        if(error)
        {
            throw error;
        }
        res.status(201).send(`Employee added with ID : ${results.insertId}`)


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
    getApprovals,
    updateUserSKill,
    deleteData,
    addNewUser,
    authUser,
    getUnapprovedSkillsById,
    getFinalrating,
};
