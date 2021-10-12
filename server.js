const express = require("express");
const app = express();

app.use(express.json());

// Middleware to print the time of each request
app.use(function (req, res, next) {
  const date = new Date();
  console.log("Time: ", date.toTimeString());
  next();
});

app.use(isUserLoggedIn);

const albumsData = [
  {
    albumId: "10",
    artistName: "Beyoncé",
    collectionName: "Lemonade",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
    releaseDate: "2016-04-25T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
  },
  {
    albumId: "11",
    artistName: "Beyoncé",
    collectionName: "Dangerously In Love",
    artworkUrl100:
      "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
    releaseDate: "2003-06-24T07:00:00Z",
    primaryGenreName: "Pop",
    url:
      "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
  },
];

function isUserLoggedIn (req, res, next) {
  // Change to false to get error response
  const isValid = true;
  if (isValid) {
    next();
  }
  else {
    res.send({"error": "Not logged in"});
  }
}

app.get("/", function (req, res) {
  res.send("Beyonce API");
});

app.get("/albums", function (req, res) {
  res.send(albumsData);
});

app.get("/albums/:albumId", function (req, res) {
  const albumId = req.params.albumId;
  const album = albumsData.find(a => a.albumId === albumId);
  res.send(album);
});

app.post("/albums", isUserLoggedIn, function (req, res) {
  const album = {
    albumId: (albumsData.length + 10).toString(),
    artistName: req.body.artistName,
    collectionName: req.body.collectionName,
    artworkUrl100: req.body.artworkUrl100,
    releaseDate: req.body.releaseDate,
    primaryGenreName: req.body.primaryGenreName,
    url: req.body.url
  };
  albumsData.push(album);
  res.send({success: true});
});

app.put("/albums/:albumId", function (req, res) {
  const albumId = req.params.albumId;
  const album = albumsData.find(a => a.albumId === albumId);
  album.artistName = req.body.artistName;
  album.collectionName = req.body.collectionName;
  album.artworkUrl100 = req.body.artworkUrl100;
  album.releaseDate = req.body.releaseDate;
  album.primaryGenreName = req.body.primaryGenreName;
  album.url = req.body.url;
  res.send({success: true});
});

app.delete("/albums/:albumId", function(req, res) {
  const albumId = req.params.albumId;
  const index = albumsData.findIndex(a => a.albumId === albumId);
  albumsData.splice(index, 1);
  return res.send({success: true});
});

app.listen(3000, () => console.log("Listening on port 3000"));