const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const expressSession = require('express-session');
const io = require('socket.io')(http);
const path = require('path');
const port = process.env.PORT || 1664;

const routes = require('./routes/index');
const admRoutes = require('./routes/admin');

require('./models/Quizz');
require('./models/Admin');

mongoose.connect('mongodb://localhost/kahoot');

app.set('view engine', 'pug');

app.use(expressSession({
    secret : 'Dear Princess Celestia',
    resave: false,
    saveUninitialized: false,
    // expires: new Date(),
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/admin', admRoutes);
// app.use('/quizz', quizzRoutes);

http.listen(port, () => console.log(`App listening at http://127.0.0.:${port}`));
