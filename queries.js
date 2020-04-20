const Pool = require("pg").Pool;
const bcrypt = require("bcrypt");
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "Skillrix",
    password: "Ashish@007",
    port: 5432,
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
    // const { emp_id } = req.body;
    pool.query(
        "select emp_id, emp_name,emp_role,account,emp_location,skill_name,final_rating,experience from  Employee_details natural join Employee_skills",
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
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
        skill_approval,
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
            skill_approval,
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
    const { emp_id } = req.body;
    pool.query(
        "select emp_name,emp_id from Employee_details where manager_id = $1",
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
    const {
        skill_name,
        experience,
        emp_rating,
        man_rating,
        skill_approval,
    } = req.body;
    pool.query(
        "UPDATE Employee_skills set experience = $3, emp_rating = $4 , man_rating = $5, skill_approval = $6 WHERE emp_id = $1 AND skill_name=$2",
        [
            emp_id,
            skill_name,
            parseFloat(experience),
            parseInt(emp_rating),
            parseInt(man_rating) || null,
            skill_approval,
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
    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
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
                                    "SELECT emp_id,emp_name,roles from employee_details WHERE email=$1",
                                    [email],
                                    (err, results) => {
                                        if (err) throw err;
                                        else {
                                            res.status(201).json({
                                                err: null,
                                                data: results.rows[0],
                                            });
                                        }
                                    }
                                );
                            } else
                                res.status(201).json({
                                    err: `Invalid Password`,
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

const getFinalrating = (req, res) => {
    const { emp_id } = req.params;

    const { skill_name, skill_approval, man_rating, emp_rating } = req.body;
    const final_rating = (parseFloat(emp_rating) + parseFloat(man_rating)) / 2;
    pool.query(
        "update Employee_skills set skill_approval = true , man_rating = $3, final_rating = $4 where emp_id = $1 and skill_name = $2",
        [emp_id, skill_name, man_rating, final_rating],
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log(man_rating);
            res.status(201).send(
                `Employee added with ID : ${results.insertId}`
            );
        }
    );
};

const getUserDeets = (req, res) => {
    const { emp_id } = req.body;
    let details = {};
    pool.query(
        "select emp_name,account,practice,emp_location,manager_id from Employee_details where emp_id= $1",
        [emp_id]
    )
        .then((resu) => {
            details.emp_details = resu.rows[0];
            pool.query(
                "SELECT emp_id,emp_name,emp_location FROM EMPLOYEE_DETAILS WHERE emp_id=$1",
                [details.emp_details.manager_id]
            )
                .then((resu) => {
                    details.manager_details = resu.rows[0];
                    res.status(200).json(details);
                })
                .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
};

const getSkillApproved = (req, res) => {
    const { emp_id } = req.body;
    pool.query(
        "select skill_name,final_rating from employee_skills where skill_approval= true and emp_id = $1",
        [emp_id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
};

const getAllSkillCount = (req, res) => {
    pool.query(
        "select skill_name as x, count(emp_id) as y from Employee_skills group by  skill_name",
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results.rows);
            res.status(200).json(results.rows);
        }
    );
};

const empRatingVsAvgRating = (req, res) => {
    const { emp_id } = req.body;
    let ratings = {};
    console.log(emp_id);
    pool.query(
        "select skill_name as x,avg(final_rating) as y from Employee_skills where emp_id  = $1 group by skill_name order by skill_name",
        [emp_id]
    )
        .then((resu) => {
            ratings.final_rating = resu.rows;

            pool.query(
                "select skill_name as x, avg(final_rating) as y from Employee_skills where skill_name in (select skill_name from Employee_skills where emp_id = $1) group by skill_name order by skill_name",
                [emp_id]
            )

                .then((resu) => {
                    ratings.avg_rating = resu.rows;

                    res.status(200).json(ratings);
                })
                .catch((e) => console.log(e));
        })

        .catch((e) => console.log(e));
};

const getSkillsById = (req, res) => {
    const { id } = req.params;
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

const addNewEmployee = (req, res) => {
    const {
        emp_id,
        email,
        emp_name,
        account,
        practice,
        hire_date,
        emp_role,
        manager_id,
        roles,
        emp_location,
        password,
    } = req.body;
    console.log(email);
    console.log(password);
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
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
                    }
                }
            );
        }
    });

    pool.query(
        "insert into Employee_details values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
        [
            emp_id,
            email,
            emp_name,
            account,
            practice,
            hire_date,
            emp_role,
            manager_id,
            emp_location,
            roles,
        ],
        (error, results) => {
            if (error) {
                throw error;
            }
            console.log(results.rows);
            res.status(201).send(`Employee added with ID : ${results.email}`);
        }
    );
};

const avgempRatings = (req, res) => {
    const { manager_id } = req.body;
    let details = {};
    pool.query(
        "select skill_name as x,avg(final_rating) as y from Employee_details natural join Employee_skills where manager_id  = $1 group by skill_name order by skill_name",
        [manager_id]
    )
        .then((resu) => {
            details.final_rating = resu.rows;
            pool.query(
                "select skill_name as x, avg(final_rating) as y from Employee_skills where skill_name in (select skill_name from Employee_Details natural join Employee_skills where manager_id = $1) group by skill_name order by skill_name",
                [manager_id]
            )
                .then((resu) => {
                    details.avg_rating = resu.rows;

                    res.status(200).json(details);
                })
                .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
};

const getManEmpCount = (req, res) => {
    const { manager_id } = req.body;
    pool.query(
        "select skill_name as x,count(emp_id) as y from  employee_Details natural join employee_skills where manager_id = $1 group by skill_name ",
        [manager_id],
        (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        }
    );
};

const getMinMaxSkillsRating = (req, res) => {
    const { manager_id } = req.body;
    let details = {};
    console.log(manager_id);
    pool.query(
        "select skill_name as x, min(final_rating) as y from Employee_details natural join employee_skills where manager_id = $1 group by skill_name order by skill_name",
        [manager_id]
    )
        .then((resu) => {
            details.min_rating = resu.rows;
            console.log(details.min_rating);
            pool.query(
                "select skill_name as x , max(final_rating) as y from Employee_details natural join employee_skills where manager_id = $1 group by skill_name order by skill_name",
                [manager_id]
            )
                .then((resu) => {
                    details.max_rating = resu.rows;

                    res.status(200).json(details);
                })
                .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
};

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
    getUserDeets,
    getSkillApproved,
    getAllSkillCount,
    empRatingVsAvgRating,
    getSkillsById,
    addNewEmployee,
    avgempRatings,
    getManEmpCount,
    getMinMaxSkillsRating,
};
