const express = require('express');
const app = express();
const db = require("../database");
let jwt = require("jsonwebtoken");


const serverSecret = "proiectTic"


//VERIFY AUTH
function verifyAuth(req, res, next) {
    let token = req.headers['authorization'];
    req.token = token;
    if (token) { jwt.verify(req.token, serverSecret ,(err, decoded) => {
        if (err) {
            res.json({ "message": "Could not decode token!" });
        } else {next();}
        })
    }
};
////////CRUD ACTIONS///////////

//test//

app.post("/testtest", async(res, req) => {
    const asf = await db.collection("cities").add({
        name: "Tokyo",
        country: "Japan"
    });
    console.log('Added document with ID: ', res.id);
}
)

//test//

//CREATE - START//
app.post("/artists", verifyAuth, async(req, res) =>{
    console.log("You are creating an artist");
    try{
        const artist = req.body;
        const response = await db.collection("artists").add(artist);
        db.collection("artists").doc(response.id).update({"id":response.id});
        res.send({"id" : response.id});
    } catch(error){res.send(error);}
});
//CREATE - END//

//READ - START//
app.get("/artists", async (req, res) => {
    let artists = [];
    try{
        const response = await db.collection("artists").get();
        response.forEach(doc => {
            let artist = {};
            artist.id = doc.id;
            artist.name = doc.data().name;
            artist.description = doc.data().description;
            artist.songId = doc.data().songId;
            artists.push(artist);
        })
        res.send(artists);
    } catch(error){res.send(error);}
})
app.get("/artists/:id", async (req, res) =>{
    try{
        const requested = db.collection("artists").doc(req.params.id);
        const response = await requested.get();
        res.send(response.data());
    }catch(error){res.send(error);}
});
//READ-END//

//UPDATE-START//
app.put("/artists/:id", verifyAuth,async (req, res) =>{
    try{
        const response = await db.collection("artists").doc(req.params.id).update(req.body);
        res.send(response);
        } catch(error){res.send(error);}
});
//UPDATE-END//

//DELETE-START//
app.delete("/artists/:id",verifyAuth, (req, res) => {
    try{
        const response = db.collection("artists").doc(req.params.id).delete().then(() =>{
            console.log("Artist has been deleted!");
            });
            res.send(response);
            }catch(error){res.send(error);}
});
//DELETE-END//

module.exports = app;