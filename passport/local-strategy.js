const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
module.exports = (passport) => {
    passport.serializeUser((admin, next) => {
        next(null, admin);
    });
    
    passport.deserializeAdmin((id, next) => {
        mongoose.model('Admin').findById(id, (err, item) => {
            if(err)
                next(err, null);
            else
                next(null, item);
        });
    });

    passport.use('local', new LocalStrategy(
        (username, password, next) => {
            mongoose.model('Admin').findOne({ username }, (err, item) => {
                if(err)
                    return next(err);
                if(!item)
                    return next('Admin doesn\'t exist');
                if(item.password !== password)
                    return next('Password doesn\'t match');
                
                next(null, item);
            });
        } 
    ));
}
