//add dependencies + initialize express
// server on port 3001
const PORT = process.env.PORT || 3001

const exp = require('constants')
const express = require('express')
const fs = require('fs')
const path = require('path') 

const app = express()
const allNotes = require('./db/db.json');

// to parse through data
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname))

//route to correct page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'));
});


//listen to PORT 3001
app.listen(PORT, function() {
    console.log("Now Listening on PORT " + PORT)
})