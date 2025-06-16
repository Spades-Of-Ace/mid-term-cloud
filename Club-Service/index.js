const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const ClubModel = require('./club_schema.js');

/*
localhost:5002/joinclub/CLUBID
{
  "studentId": "123"
}
*/
app.post('/joinclub/:clubid', async (req, res) => {
  console.log("INSIDE JOIN CLUB API");
  try {
    const club = await ClubModel.findById(req.params.clubid);
    if (!club.members.includes(req.body.studentId)) {
      club.members.push(req.body.studentId);
      await club.save();
    }
    res.status(200).send("Joined club successfully");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

/*
localhost:5002/leaveclub/CLUBID
{
  "studentId": "123"
}
*/
app.post('/leaveclub/:clubid', async (req, res) => {
  console.log("INSIDE LEAVE CLUB API");
  try {
    const club = await ClubModel.findById(req.params.clubid);
    club.members = club.members.filter(id => id !== req.body.studentId);
    await club.save();
    res.status(200).send("Left club successfully");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

/*
localhost:5002/joinevent/CLUBID/EVENTID
{
  "studentId": "123"
}
*/
app.post('/joinevent/:clubid/:eventid', async (req, res) => {
  console.log("INSIDE JOIN EVENT API");
  try {
    const club = await ClubModel.findById(req.params.clubid);
    if (!club.events.includes(req.params.eventid)) {
      club.events.push(req.params.eventid);
      await club.save();
    }
    res.status(200).send("Joined event successfully");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(5002, () => {
  console.log('Club Service running on port 5002');
});
