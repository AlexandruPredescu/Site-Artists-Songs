require('dotenv')
let jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const songsModel = require("./models/songs")
const artistModel = require("./models/artists")
const Chance = require('chance');
let chance = new Chance();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const morgan = require('morgan');
const PORT = 3000;


const secret = 'proiectTic'

app.use(cors({origin: true}));

app.use(morgan('dev'));
app.use(express.json()); //parse json bodies
app.use(express.urlencoded({ extended: false}));
const db = require('./database.js');

// SONGS
app.use("/", songsModel);

// ARTISTS
app.use("/", artistModel);

// GENERATE WITH CHANCE ARITSTS
app.post('/linkForRandomGenerateArtists/:artists', async (req, res) => {
    let number = req.params.artists;
    for(let i= 0; i< number; i++){
        let jsonArtist={
          name: chance.sentence({words: chance.integer({min: 1, max:2})}),
          description: chance.sentence({words: chance.integer({min: 4, max: 12})}),
          songId: []
        }
    const result = await db.collection("artists").add(jsonArtist);
    db.collection("artists").doc(result.id).update({"id" : result.id})
    console.log("Created artist with ID: ", result.id);}
    res.send("You will create " + number + " artists.")
})

// GENERATE WITH CHANCE SONGS
app.post('/linkForRandomGenerate/:songs', async (req, res) => {
    let number = req.params.songs;
    const response = await db.collection("artists").get()
    let artistList = [];
    response.forEach(doc => {
        artistList.push(doc.id);
    })
    for (let i = 0; i<number; i++){
        let jsonSong = {
            artistId: artistList[Math.floor(Math.random() * (artistList.length))],
            title: chance.sentence({words: chance.integer({min: 1, max:3})}),
            genre: chance.sentence({words: chance.integer({min: 1, max: 2})}),
            duration: chance.minute({min: 2, max: 11})
        }
        const result = await db.collection("songs").add(jsonSong);
        db.collection("songs").doc(result.id).update({"id" : result.id})
        console.log("Song added with id: ", result.id);
        let songsList = [];
        await db.collection('artists').doc(jsonSong.artistId).get().then(snapshot => {
            songsList = snapshot.data().songId;
        });
        songsList.push(result.id);
        db.collection("artists").doc(jsonSong.artistId).update({ "songId" : songsList});
    }
    res.send("You will add " + number + " songs");
})

// USER REGISTRATION
app.post('/register', async (req, res) => {
    let data = req.body;
    let registeredUser = false;
  
    const username = db.collection('users');
    const response = await username.where('email', '==', data.email).get();
    if (!response.empty) {
      registeredUser = true;
    };
    if (registeredUser) {
      res.send('This email address is already in use.')
    }
    else {
      bcrypt.hash(data.password, saltRounds).then(async function (hash) {
        data.password = hash;
        const user = await db.collection('users').add(data);
        console.log(`Welcome, ${user.id}, hope you will have a great time on VueMusic`);
        res.send('Registration success');
      });
    }
});


// USER LOGIN
app.post('/login', async (req, res) => {
    let data = req.body;
    const username = db.collection('users');
    const snapshot = await username.where('email', '==', data.email).get();
    if (snapshot.empty) {
      res.json("User not regisetered");
    } else {
      snapshot.forEach(doc => {
        bcrypt.compare(data.password, doc.data().password).then(async function (result) {
          if (result) {
            let token = jwt.sign({ email: doc.data().email }, secret);
            let response = {};
            response.token = token;
            response.message = 'You have the right to access private resources'
            res.json(response);
          }
          else {
            let response = {};
            response.message = "Password missmatch";
            res.json(response)
          }
        });
      });
    }
  })
  

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
});

module.exports = app;
module.exports = db;
