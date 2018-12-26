const express = require('express');

const squadsController = require('../controllers/squadsController');

const router = express.Router();

router.get('/', squadsController.getHome);
router.get('/squads/:id', squadsController.getSquadById);

router.get('/squads', squadsController.getAllSquads);
router.post('/add-squad', squadsController.postSquad);

router.get('/edit-squad/:id', squadsController.getEditSquad);
router.post('/edit-squad', squadsController.postEditSquad);
router.post('/delete-squad', squadsController.postDeleteSquad);

module.exports = router;