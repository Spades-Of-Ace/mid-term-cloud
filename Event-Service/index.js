const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const EventModel = require('./event_schema.js');

/*
localhost:5003/addevent
{
  "name": "Welcome Party",
  "club": "123ABC",
  "description": "First event of the semester",
  "date": "2025-07-01"
}
*/
app.post('/addevent', (req, res) => {
  console.log("INSIDE ADD EVENT API");
  const newEvent = new EventModel({
    name: req.body.name,
    club: req.body.club,
    description: req.body.description,
    date: req.body.date
  });

  newEvent.save()
    .then(doc => res.status(200).send('Event added successfully'))
    .catch(err => res.status(500).send("Error: " + err.message));
});

/*
localhost:5003/viewevents
*/
app.get('/viewevents', (req, res) => {
  console.log("INSIDE VIEW EVENTS API");
  EventModel.find()
    .then(events => res.status(200).send(events))
    .catch(err => res.status(500).send("Error: " + err.message));
});

/*
localhost:5003/updateevent/EVENTID
{
  "name": "Updated Name",
  "description": "Updated Description"
}
*/
app.put('/updateevent/:id', (req, res) => {
  console.log("INSIDE UPDATE EVENT API");
  EventModel.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      description: req.body.description,
      date: req.body.date
    }
  }, { new: true })
    .then(doc => res.status(200).send('Event updated successfully'))
    .catch(err => res.status(500).send("Error: " + err.message));
});

/*
localhost:5003/deleteevent/EVENTID
*/
app.delete('/deleteevent/:id', (req, res) => {
  console.log("INSIDE DELETE EVENT API");
  EventModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send('Event deleted successfully'))
    .catch(err => res.status(500).send("Error: " + err.message));
});

app.listen(5003, () => {
  console.log('Event Service running on port 5003');
});
