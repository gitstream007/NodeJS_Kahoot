const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    res.render('index', { title: "Welcome to Kahoot" });
});

module.exports = router;