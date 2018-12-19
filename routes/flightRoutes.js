const express = require('express');

const flightsController = require('../controllers/flightsController');

const router = express.Router();

router.get('/', flightsController.home);
router.get('/flights/:id', flightsController.flightById);

router.get('/flights', flightsController.flights);
router.post('/add-flight', flightsController.addFlight);

router.get('/squads', flightsController.getSquads);
router.post('/squads', flightsController.addSquad);

module.exports = router;