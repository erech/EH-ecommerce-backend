//add dependencies + initialize express
// server on port 3001
const PORT = process.env.PORT || 3001

const exp = require('constants')
const express = require('express')
const fs = require('fs')
const path = require('path') 

const app = express()
const allNotes = require('./db/db.json')

// to parse through data
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static(__dirname))

//routes to index and notes html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
});


//function to create new note + store note array as an object
function notesArray (body, createdArray) {
    const newNote = body;
    if (!Array.isArray(createdArray))
    createdArray = [];
    
    if (createdArray.length === 0)
    createdArray.push(0);

    body.id = createdArray[0];
    createdArray[0]++;

    createdArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, 'Develop/db/db.json'),
        JSON.stringify(createdArray, null, 2)
    );

    return newNote;
}

// POST method to add newNote
app.post('/api/notes', (req, res) => {
    const newNote = notesArray(req.body, allNotes);
    res.json(newNote);
});

//function to delete chosen note
function deleteNote(id, createdArray) {
    for (let i = 0; i < createdArray.length; i++) {
        let note = createdArray[i];

        if (note.id == id) {
            createdArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, 'Develop/db/db.json'),
                JSON.stringify(createdArray, null, 2)
            );
            break;
        }
    }}

// POST method to delete note
app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, allNotes);
    res.json(true);
});

//listen to PORT 3001
app.listen(PORT, function() {
    console.log("Now Listening on PORT " + PORT)
})