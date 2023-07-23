const db = require("../db/dbConfig.js")

//All the Songs will appear:

//SHOW
const getAllSongs = async () =>{
    try {
      const allSongs = await db.any("SELECT * FROM songs");
      return allSongs;
    } catch (error) {
      return error;
    }
  };

//This is were the 'db.one' that targets ONE of the songs for CRUD starts appearing:

//SHOW
const getSong = async (id) =>{
  try{
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$[id]",{id: id,});
    return oneSong;
  } catch (error) {
    return error
  }
} 

//CREATE
const createSong = async (song) =>{
  try{
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong;
  } catch (error) {
    return error;
  }
}

//DELETE
const deleteSong = async (id) =>{
  try {
    const deleteSong = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return deleteSong;
  } catch (error){
    return error;
  }
}

//UPDATE
const editSong = async (id, song) =>{
  try{
    const editSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return editSong
  } catch(error){
    return error
  }
 }

module.exports = { 
  getAllSongs,
  createSong,
  getSong,
  deleteSong,
  editSong
 };