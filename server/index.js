const express = require("express")
const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.json())


const mysql = require("mysql")
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'planbase'
})

connection.connect()

app.post('/api/insertMeeting', (req, res) => {
  const meeting = req.body
  let sqlQuery =  mysql.format("INSERT INTO meetings (Fach, Uhrzeit, Datum, Plattform, Link) VALUES (?, ?, ?, ?, ?)", [meeting.Fach, meeting.Uhrzeit, meeting.Datum, meeting.Plattform, meeting.Link])
  connection.query(sqlQuery, (error) => {
    if (error) {
      return console.error(error.message)
    }
    res.json("Success!")
  })
})

app.post('/api/login', (req, res) => {
  const password = req.body

  if(password.password === "10m1Meetingplan") {
    res.send('Correct Password')
  }
  else {
    res.send('Wrong Password')
  }
})


app.get('/api/meetings', (req, res) => {
  connection.query('SELECT * FROM meetings', (error, results) => {
    if (error) {
      return console.error(error.message)
    }
    res.json({message: results})
  })
})

app.delete('/api/meetings/delete', (req, res) => {
  const meetingDel = req.body
  console.log(meetingDel.Fach)
  let sqlQuery = mysql.format(`DELETE FROM meetings WHERE Fach='${meetingDel.Fach}' AND Uhrzeit='${meetingDel.Uhrzeit}' AND Datum='${meetingDel.Datum}' AND Plattform='${meetingDel.Plattform}' AND Link='${meetingDel.Link}'`)
  connection.query(sqlQuery, (error) => {
    if (error){
      return console.log(error.message)
    }
    res.json("Success!")
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
