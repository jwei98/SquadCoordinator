const express = require('express');

const flightsController = require('../controllers/flightsController');

const router = express.Router();

router.get('/', flightsController.getHome);
router.get('/flights/:id', flightsController.getFlightById);

router.get('/flights', flightsController.getFlights);
router.post('/add-flight', flightsController.postFlight);

router.get('/edit-flight/:id', flightsController.getEditFlight);
router.post('/edit-flight', flightsController.postEditFlight);

router.get('/squads', flightsController.getSquads);
router.post('/squads', flightsController.postSquad);

module.exports = router;