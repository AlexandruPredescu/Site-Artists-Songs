const express = require('express');
const app = express();
const db = require("../database");
let jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');


const serverSecret = "proiectTic"


//auth

function verifyAuth(req, res, next) {
    let token = req.headers['authorization'];
    req.token = token;
    if (token) { jwt.verify(req.token, serverSecret ,(err, decoded) => {
            if (err) {
                res.json({ "message": "Could not decode token!" });
            } else { next();}
        })
    }
}

////////CRUD ACTIONS///////////

//CREATE - START//
app.post("/songs", verifyAuth, async (req, res) =>{
     try{
        const song = req.body;
        const response = await db.collection("songs").add(song);
        db.collection("songs").doc(response.id).update({"id" : response.id});
        res.send({ "id": response.id });
    } catch(error){res.send(error);}
});
//CREATE - END//

//READ - START//
app.get('/songs', async (req, res) => {
    let songs = [];
    try{
        const response = await db.collection("songs").get();
        response.forEach(doc => {
            let song = {};
            song.id = doc.id;
            song.title = doc.data().title;
            song.genre = doc.data().genre;
            song.duration = doc.data().duration;
            song.artistId = doc.data().artistId;
            songs.push(song);
    })
    res.send(songs);
} catch(error){res.send(error)}
})
app.get("/songs/:id", async (req, res) =>{
    try{
        const userRef = db.collection("songs").doc(req.params.id);
        const response = await userRef.get();
        res.send(response.data());
    }catch(error){res.send(error);}
});
//READ-END//

//UPDATE-START//
app.put("/updatesong/:id", verifyAuth,async (req, res) => {
    try{
    const response = await db.collection("songs").doc(req.params.id).update(req.body);
    res.send(response);
    } catch(error){res.send(error)}
})
//UPDATE-END//

//DELETE-START//
app.delete("/songs/:id", verifyAuth,(req, res) => {
    try{
        const response = db.collection("songs").doc(req.params.id).delete().then(() =>{
                console.log("Song has been deleted!");});
                res.send(response);
            }catch(error){res.send(error);}})        
//DELETE-END//

//TAGS-ADD//
app.post("/songs/tags/:id", verifyAuth, async (req, res) => {
    try {
      const tag = req.body;
      const docRef = await db
        .collection("songs")
        .doc(req.params.id)
        .collection("tags")
        .add(tag);
  
      const response = {
        id: docRef.id,
        name: tag.name
      };
  
      await docRef.update(response);
  
      res.send(response);

    } catch (error) {
      res.send(error);
    }
  });
  
//TAGS-ADD//

//TAGS-GET//
app.get('/songs/tags/:id', async (req, res) => {
    let tags = [];
    try{
        const response = await db.collection("songs").doc(req.params.id).collection("tags").get();
        response.forEach(doc => {
            // let tag = {};
            // tag.id = doc.id;
            // tag.name = doc.name;
            
            tags.push(doc);

    })
    res.send(tags); //sau send?
} catch(error){res.send(error)}
})
//TAGS-GET//

//TAGS-DELETE//
app.delete("/songs/tags/:id", verifyAuth, async (req, res) => {
    try {
      const songId = req.params.id;
  
      // Get all subcollections under the song document
      const collectionsSnapshot = await db
        .collection("songs")
        .doc(songId)
        .listCollections();
  
      // Delete each subcollection
      const deletePromises = collectionsSnapshot.map(async (collection) => {
        const documentsSnapshot = await collection.get();
        const deleteDocumentPromises = documentsSnapshot.docs.map((doc) => doc.ref.delete());
        return Promise.all(deleteDocumentPromises);
      });
  
      await Promise.all(deletePromises);
  
      res.send("Tags have been deleted!");
    } catch (error) {
      res.status(500).send("Error deleting tags");
    }
  });
  
//TAGS-DELETE//


module.exports = app;