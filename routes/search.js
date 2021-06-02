const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/searchMoim', searchController.searchMoim);

module.exports = router;