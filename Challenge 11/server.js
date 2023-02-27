//add dependencies + initialize express
const PORT = process.env.PORT || 3001

const exp = require('constants')
const express = require('express')
const fs = require('fs')
const path = require('path') 

const app = express()
const allNotes = require('./Develop/db/db.json');

// to parse through data
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname))

// app.get('/api/notes', (req, res) => {
//     res.json(allNotes.slice(1));
// });

//send user to correct page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


//lister to PORT 3001
app.listen(PORT, function() {
    console.log("Now Listening on PORT " + PORT)
})