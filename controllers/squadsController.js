const Squad = require('../models/Squad');

exports.getHome = (req, res, next) => {
    const homePageData = {
        pageTitle: 'Home',
        path: '/'
    };
    res.render('home', homePageData);
};

exports.getAllSquads = (req, res, next) => {
    // we want to display all squads
    Squad.findAll()
        .then(result => {
            const squadsPageData = {
                pageTitle: 'All Open Squads',
                path: '/squads',
                squads: result
            };
            res.render('squads', squadsPageData);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getEditSquad = (req, res, next) => {
    const id = req.params.id;
    Squad.findByPk(id)
        .then(squad => {
            res.render('edit-squad', {
                pageTitle: "Editing Squad",
                path: "/edit-squad",
                squad: squad
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getSquadById = (req, res, next) => {
    const id = req.params.id;
    const user = req.user;

    user.getLineup()
        .then(lineup => {
            return lineup.getSquads({
                where: {
                    id: id
                }
            })
        })
        .then(squads => {
            // doesn't exist in user's lineup
            if (squads.length == 0) {
                return false
            } else {
                return true
            }
        })
        .then(inLineup => {
            console.log(inLineup);
            Squad.findByPk(id)
                .then(result => {
                    res.render('squad', {
                        pageTitle: "Squad " + id,
                        path: "/squads/" + id,
                        squad: result,
                        uid: req.user.id,
                        inUserLineup: inLineup
                    })
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => console.log(err));
};


// POST routes

exports.postSquad = (req, res, next) => {
    const user = req.user;
    const dateTime = new Date(req.body.dateTime);
    const capacity = req.body.capacity;
    const rendezvous = req.body.rendezvous;
    const destination = req.body.destination;
    user.createSquad({
            dateTime: dateTime,
            capacity: capacity,
            rendezvous: rendezvous,
            destination: destination,
        })
        .then(squad => {
            return user.getLineup()
                .then(lineup => {
                    lineup.addSquad(squad);
                })
                .catch(err => console.log(err))
        })
        .then(result => {
            res.redirect('/squads');
        })
        .catch(err =>
            console.log(err)
        );
};

exports.postEditSquad = (req, res, next) => {
    const id = req.body.id;
    Squad.findByPk(id)
        .then(squad => {
            squad.dateTime = new Date(req.body.dateTime);
            squad.capacity = req.body.capacity;
            squad.rendezvous = req.body.rendezvous;
            squad.destination = req.body.destination;
            return squad.save();
        })
        .then(result => {
            res.redirect('/squads/' + id);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteSquad = (req, res, next) => {
    const id = req.body.id;
    Squad.findByPk(id)
        .then(squad => {
            return squad.destroy();
        })
        .then(result => {
            res.redirect('/squads');
        })
        .catch(err => {
            console.log(err);
        });
};
