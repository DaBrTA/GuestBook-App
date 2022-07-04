var userDb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }

    const user = new userDb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    user
        .save(user)
        .then(data => {
            res.redirect('/')
        })

        .catch(err => {
            res.status(500).send({
                message: err.message || "Error Occured"
            });
        });
};

//retrieve and return users / single user
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;

        userDb.findById(id)
            .then(data => {
                if (!data) {
                    res.send(404).send({ message: 'User cannot be found' })
                } else {
                    res.send(data)
                }
            })
            .catch(Err => {
                res.status(500).send({ message: 'Error finding information' })
            })

    } else {
        userDb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error Occurred" })
            })
    }


};

//Update a user by id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data cannot be empty" })
    }

    const id = req.params.id;
    userDb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.send(404).send({ message: 'User cannot be found' })
            } else {
                res.send(data)
            }
        })

        .catch(Err => {
            res.status(500).send({ message: 'Error updating information' })
        })
};

//delete user
exports.delete = (req, res) => {
    const id = req.params.id;
    userDb.findByIdAndDelete(id, req.body)
        .then(data => {
            if (!data) {
                res.send(404).send({ message: 'User cannot be found' })
            } else {
                res.send({ message: 'User Deleted' })
            }
        })

        .catch(Err => {
            res.status(500).send({ message: 'Error deleting information' })
        });
};