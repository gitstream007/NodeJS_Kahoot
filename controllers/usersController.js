var exports = module.exports = {};

exports.list_users = function (req, res) {

    let jsonListUsers = {
        name: 'Ludovic'
    };

    Users.find({}, function(err, users){
        if (err){
            return res.status(500).send(err);
        }

        if (users){
            return res.json(users);
        }
    });
};

exports.create_users = function (req, res) {

    let user_data = {};

    if (req.body.email && req.body.password) {

        user_data.email = req.body.email;
        user_data.password = req.body.password;

        let user = Users(user_data);

        user.save(function (err, theUser) {
            if (err) return console.error(err);

            res.json({status: 'success!', message: 'User added successfully !!'});
        });


    } else {
        return res.json({status: 'error', message: 'Missing parameters: email or password !!'});
    }
};

exports.edit_users = function (req, res) {

    let user_data = {};

    if (req.params.user_id && (req.body.email || req.params.password)) {

        Users.findOne({ '_id' : req.params.user_id}, function(err, user){
            if (err){
                return res.status(500).send(err);
            }

            if (req.body.email) {
                user_data.email = req.body.email;
            }

            if (req.body.password) {
                user_data.password = req.body.password;
            }

            user.save((err, theUser) => {
                if (err) return res.status(500).send(err);
                return res.send(theUser);
            });
        })

    } else {
        return res.status(500).send({status: 'error', message: 'Missing parameters!!'});
    }
};

exports.delete_users = function (req, res) {

    if (req.params.user_id) {


        Users.findOne({ '_id' : req.params.user_id}, function(err, user){
            if (err){
                return res.status(500).send(err);
            }

            user.remove((err) => {
                return res.send('User removed successfully');
            })
        });


    } else {
        return res.status(500).send({status: 'error', message: 'Missing parameters: User ID !!'});
    }
};
