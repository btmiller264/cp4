const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    group: String,
});
  
const Group = mongoose.model('Group', groupSchema);

const teamSchema = new mongoose.Schema({
  name: String,
  location: String,
  league: String,
  wonBefore: Boolean,
  titlesWon: String,
  mostRecentWin: String,
  topScorer: String,
  eliminated: Boolean,
  group: {
      type: mongoose.Schema.ObjectId,
      ref: 'Group'
  }
});

const Team = mongoose.model('Team', teamSchema);

const matchupSchema = new mongoose.Schema({
    message: String,
    teamOne: String,
    teamTwo: String,
});

const Matchup = mongoose.model('Matchup', matchupSchema);

const gameSchema = new mongoose.Schema({
    date: String,
    home: String,
    away: String,
    homeScore: String,
    awayScore: String,
    leg: Number,
    matchup: {
      type: mongoose.Schema.ObjectId,
      ref: 'Matchup'
    },
});

const Game = mongoose.model('Game', gameSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/cl', {
  useNewUrlParser: true
});

// Create a new item in the museum: takes a title and a path to an image
app.post('/api/group', async (req, res) => {
  const group = new Group({
      group: req.body.name
  });
  try {
    await group.save();
    res.send(group);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/group/:groupID', async (req, res) => {
  try {
    await Team.deleteMany({
      group: req.params.groupID
    });
    await Group.deleteOne({
      _id: req.params.groupID
    });
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/:groupID/team', async (req, res) => {
    let group = await Group.findOne({_id: req.params.groupID});
    const team = new Team({
        name: req.body.name,
        location: req.body.location,
        league: req.body.league,
        titlesWon: req.body.titlesWon,
        wonBefore: req.body.wonBefore,
        mostRecentWin: req.body.mostRecentWin,
        topScorer: req.body.topScorer,
        eliminated: req.body.eliminated,
        group: group,
    });
    try {
      await team.save();
      res.send(team);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.get('/api/groups', async (req, res) => {
  try {
    let items = await Group.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/teams', async (req, res) => {
    try {
      let items = await Team.find();
      res.send(items);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

app.put('/api/:groupID/:teamID', async (req, res) => {
  try {
    let team = await Team.findOne({_id: req.params.teamID});
    let group = await Group.findOne({_id: req.params.groupID});
    team.name = req.body.name;
    team.location = req.body.location;
    team.league = req.body.league;
    team.titlesWon = req.body.titlesWon;
    team.wonBefore = req.body.wonBefore;
    team.mostRecentWin = req.body.mostRecentWin;
    team.topScorer = req.body.topScorer;
    team.eliminated = req.body.eliminated;
    team.group = group;
    await team.save();
    res.send(team);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } 
});

app.delete('/api/:teamID', async (req, res) => {
  try {
    await Team.deleteOne({
      _id: req.params.teamID
    });
    res.sendStatus(200);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/matchup', async (req, res) => {
  try {
    let matchup = new Matchup({
      message: 'First leg to be played on ' + req.body.date,
      teamOne: req.body.home,
      teamTwo: req.body.away,
    });
    await matchup.save();
    matchup = await Matchup.findOne({teamOne: req.body.home, teamTwo: req.body.away});
    let game1 = new Game({
      date: req.body.date,
      home: req.body.home,
      away: req.body.away,
      homeScore: "-",
      awayScore: "-",
      leg: 1,
      matchup: matchup,
    });
    let game2 = new Game({
      date: req.body.date,
      home: req.body.away,
      away: req.body.home,
      homeScore: "-",
      awayScore: "-",
      leg: 2,
      matchup: matchup,
    });
    await game1.save();
    await game2.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/games', async (req, res) => {
  try {
    let games = await Game.find();
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/matchups', async (req, res) => {
  try {
    let games = await Matchup.find();
    res.send(games);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/:matchupID', async (req, res) => {
  try {
    let matchup = await Matchup.findOne({_id: req.params.matchupID});
    matchup.teamOne = req.body.home;
    matchup.teamTwo = req.body.away;
    matchup.date = req.body.date;
    await matchup.save();
    let games = await Game.find({matchup: matchup});
    let game1 = games[0];
    game1.date = req.body.date;
    game1.home = req.body.home;
    game1.away = req.body.away;
    await game1.save();
    let game2 = games[1];
    game2.date = req.body.date;
    game2.home = req.body.away;
    game2.away = req.body.home;
    await game2.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  } 
});

app.delete('/api/matchups/:matchupID', async (req, res) => {
  try {
    await Game.deleteMany({
      matchup: req.params.matchupID,
    });
    await Matchup.deleteOne({
      _id: req.params.matchupID,
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
