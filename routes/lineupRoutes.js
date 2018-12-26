const express = require('express');

const lineupController= require('../controllers/lineupController');

const router = express.Router();

router.get('/lineup', lineupController.getLineup);
router.post('/lineup', lineupController.postLineup);
router.post('/remove-from-lineup', lineupController.postRemoveFromLineup);

module.exports = router;