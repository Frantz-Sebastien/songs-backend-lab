const express = require("express");
const songs = express.Router();
const { getAllSongs, 
    getSong,
    createSong,
    deleteSong,
    editSong
 } = require("../queries/songs")
 const { checkBoolean, checkSongName, checkArtistName } = require("../validations/checkSongs.js")

// INDEX
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if(allSongs[0]){
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "Can't show all the songs... bummer..." })
  }
});

//SHOW
songs.get("/:id", async (req, res)=>{
    const { id } = req.params;
    const song = await getSong(id);
    if (song){
        res.json(song);
    } else {
        res.status(404).json({ error: "that song isn't on the list" })
    }
});

//CREATE
songs.post("/", checkSongName, checkBoolean, checkArtistName, async (req, res)=>{
    try{
        const song = await createSong(req.body);
        res.json(song);
    } catch (error){
        res.status(400).json({ error: "Can't add a song. there's an error" })
    }
})

//DELETE
songs.delete("/:id", async (req, res)=>{
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if(deletedSong.id){
        res.status(200).json(deletedSong)
    } else{
        res.status(404).json("Can't delete a song I can't find")
    }
})

//UPDATE
songs.put("/:id", checkSongName, checkBoolean, checkArtistName, async (req,res)=>{
    const { id } =req.params
    const editedSong = await editSong(id, req.body)
    res.status(200).json(editedSong)
})

module.exports = songs;