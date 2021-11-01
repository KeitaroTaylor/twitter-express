const MongoClient = require('mongodb').MongoClient
const figlet = require('figlet')
const express = require ('express');
const bodyParser= require('body-parser')
const app = express();

var db, collection;
// database info goes here
const url = "mongodb+srv://keitarotaylor:nanticoke@cluster0.e2snc.mongodb.net/birdSightings?retryWrites=true&w=majority"
const dbName = "birdSightings"

app.listen(3000, () => {
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
      if(error) {
          throw error;
      }
      db = client.db(dbName);
      collection = db.collection('tweets')
      console.log("Connected to `" + dbName + "`!");
  });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

//-------------------------------GET(Read)
app.get('/', (req, res) => {
    db.collection('birds').find().toArray((err, result) => {
      if (err) return console.log(err)
      res.render('index.ejs', {birds: result})
    })
})

//------------------------------PUT (Update)
app.put('/birds', (req, res) => {
    db.collection('birds')
    .findOneAndUpdate({
    count: req.body.count,
    species: req.body.species,
    }, {
      $set: {
        count:req.body.count + 1
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
})

//-------------------------------POST (create)

app.post('/birds', (req, res) => {
    db.collection('birds').insertOne({
    date: req.body.date,
    species: req.body.species,
    count: parseInt(req.body.count),
    location: req.body.location
    }, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/')
    })
  })

//-------------------------------Delete (delete)

app.delete('/birds', (req, res) => {
    db.collection('tweets').findOneAndDelete({
    count: req.body.count,
    species: req.body.species,
    }, (err, result) => {
      if (err) return res.send(500, err)
      res.send('Message deleted!')
    })
  })