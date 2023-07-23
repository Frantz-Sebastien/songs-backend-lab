const checkSongName = (req, res, next) => {
  if (req.body.name) {
    next();
  } else {
    res.status(400).json({ error: "You gotta put the song's name, baby!" });
  }
}

const checkArtistName = (req, res, next) =>{
  if(req.body.artist){
    next()
  } else{
    res.status(400).json({ error: "You DO know the artist name, right?"})
  }
}

const checkBoolean = (req, res, next) => {
  const { is_favorite } = req.body;
  if (
    is_favorite == "true" ||
    is_favorite == "false" ||
    is_favorite == undefined
  ) {
    next();
  } else {
    res.status(400).json({ error: "Is that a favorite song, or nah? You gotta decide, baby!" });
  }
};  
  module.exports = { checkSongName, checkBoolean, checkArtistName };