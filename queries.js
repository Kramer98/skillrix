const Pool = require('pg').Pool
const pool = new Pool(
    {
        user:'postgres',
        host:'localhost',
        database:'Skill_Employee',
        password:'root',
        port:5432,
    }
)
const getusers = (request, response) => {
    pool.query('select emp_name from Employee_details', (error,results) => {
        if(error)
        {
            //console.log("i m breaking here at get")
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (req,res) => {
    const {email} = req.params;
    // console.log("-------------req.params------------", req.params)
    // console.log("----------req.query---------", req.query)
    // console.log(id)
    pool.query('select emp_name from Employee_details where email= $1' ,[email],(error,results) => {
        if(error)
        {
            console.log(error)
        }
        console.log(results)
        res.status(200).json(results.rows)

    })
}

    const getSkills = (req,res) => {
        
        pool.query('select * from Employee_skills',(error,results) => {
            if(error)
            {
                console.log(results)
            }
            res.status(200).json(results.rows)
        })
    }

const getSkillById = (req,res) => {
    const {id} = req.params;
    console.log(id)
//    pool.query('select skill_name,experience,emp_rating,man_rating,skill_approval from Employee_Skills where emp_id = (select emp_id from Employee_details where email= $1' [id],(error,results) => {
    pool.query('select skill_name,experience,emp_rating,man_rating,skill_approval from Employee_Skills where emp_id = $1' ,[id],(error,results) => {

    if(error)
        {
            console.log(error)
        }
        res.status(200).json(results.rows)

    })
}

const addSkill = (req,res) => {
    const {skill_name} =    req.body
    pool.query('insert into skills (skill_name) values ($1)'[skill_name],(error,results) => {
        if(error)
        {
            throw error
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
}
