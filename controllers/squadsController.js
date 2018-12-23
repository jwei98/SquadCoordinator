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
    Squad.findByPk(id)
        .then(result => {
            res.render('squad', {
                pageTitle: "Squad " + id,
                path: "/edit-squad",
                squad: result,
                uid: req.user.id
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getLineup = (req, res, next) => {
    req.user.getLineup()
        .then(lineup => {
            return lineup.getSquads()
        })
        .then(squads => {
            const lineupData = {
                pageTitle: 'Your Lineup',
                path: '/lineup',
                lineup: squads
            };
            res.render('lineup', lineupData);
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

// adds a squad to user's lineup
exports.postLineup = (req, res, next) => {
    const squadId = req.body.id;
    const user = req.user;
    var userLineup;

    user.getLineup()
        .then(lineup => {
            userLineup = lineup;
            return lineup.getSquads({
                where: {
                    id: squadId
                }
            });
        })
        .then(squads => {
            if (squads.length === 0) {
                return Squad.findByPk(squadId);
            } else {
                res.redirect('/lineup');
            }
        })
        .then(squad => {
            return userLineup.addSquad(squad)
                .then(result => res.redirect('/lineup'))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

};