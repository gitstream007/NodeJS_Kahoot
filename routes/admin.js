const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

router.get('/signup', (req, res, next) => {
    res.render('admin/register');
});

router.post('/signup', (req, res, next) => {
    mongoose.model('Admin').create(req.body, (err, item) => {
        res.redirect('/admin/login');
    });
});

router.get('/login', (req, res, next) => {
    res.render('admin/login');
});

router.post('/login',passport.authenticate('local', { failureRedirect: '/error'}) ,(req, res, next) => {
    res.redirect('/');
});

router.get('/logout',(req, res, next) => {
    req.logout();
    res.redirect('/');
})

module.exports = router;
