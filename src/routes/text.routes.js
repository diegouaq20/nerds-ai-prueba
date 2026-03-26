const express = require('express');
const router = express.Router();
const textController = require('../controllers/text.controller');

router.post('/process', textController.process);
router.post('/transform', textController.transform);

module.exports = router;