const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const InventoryModel = require('./inventory_schema.js');

/*
localhost:5005/addinventory
{
  "itemName": "Microphone",
  "quantity": 10,
  "location": "Room A"
}
*/
app.post('/addinventory', (req, res) => {
  console.log("INSIDE ADD INVENTORY API");
  const newItem = new InventoryModel({
    itemName: req.body.itemName,
    quantity: req.body.quantity,
    location: req.body.location
  });

  newItem.save()
    .then(() => res.status(200).send('Inventory item added successfully'))
    .catch(err => res.status(500).send("Error: " + err.message));
});

/*
localhost:5005/checkinventory
*/
app.get('/checkinventory', (req, res) => {
  console.log("INSIDE CHECK INVENTORY API");
  InventoryModel.find()
    .then(items => res.status(200).send(items))
    .catch(err => res.status(500).send("Error: " + err.message));
});

/*
localhost:5005/removeinventory/INVENTORY_ID
*/
app.delete('/removeinventory/:id', (req, res) => {
  console.log("INSIDE REMOVE INVENTORY API");
  InventoryModel.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).send('Inventory item removed successfully'))
    .catch(err => res.status(500).send("Error: " + err.message));
});

/*
localhost:5005/updateinventory/INVENTORY_ID
{
  "itemName": "Projector",
  "quantity": 5,
  "location": "Room B"
}
*/
app.put('/updateinventory/:id', (req, res) => {
  console.log("INSIDE UPDATE INVENTORY API");
  InventoryModel.findByIdAndUpdate(req.params.id, {
    $set: {
      itemName: req.body.itemName,
      quantity: req.body.quantity,
      location: req.body.location
    }
  }, { new: true })
    .then(() => res.status(200).send('Inventory item updated successfully'))
    .catch(err => res.status(500).send("Error: " + err.message));
});

app.listen(5005, () => {
  console.log('Inventory Service running on port 5005');
});
