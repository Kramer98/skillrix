const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')

// app.use()
app.use(bodyparser.json())
app.use(

    bodyparser.urlencoded({
        extended: true
    })
)

app.get('/',(reqest,response) => {
    response.json({info:'Node, express and psql'})
})


app.listen(port, () =>{
    console.log(`App is running on ${port}`)
})

app.get('/users',db.getusers)
app.post('/users/:email',db.getUserById)
app.get('/skills/',db.getSkills)
app.post('/skills/:id',db.getSkillById)
app.post('/adduser',db.addSkill)