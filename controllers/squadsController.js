const User = require('../models/User');
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

exports.getSquads = (req, res, next) => {
    Squads.getAllSquads((squads) => {
        const squadsData = {
            pageTitle: 'Your Squads',
            path: '/squads',
            squads: squads
        };
        res.render('squads', squadsData);
    });
};

// POST routes
const createSquad = (req) => {
    const dateTime = new Date(req.body.dateTime);
    const capacity = req.body.capacity;
    const rendezvous = req.body.rendezvous;
    const destination = req.body.destination;

    return req.user.createSquad({
        dateTime: dateTime,
        capacity: capacity,
        rendezvous: rendezvous,
        destination: destination,
    });
};

exports.postSquad = (req, res, next) => {
    createSquad(req)
        .then(result => {
            console.log(result);
            res.redirect('/squads');
        })
        .catch(err => {
            console.log(err)
        });
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
            console.log("UPDATED squad " + id);
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
            console.log('DELETED squad ' + id);
            res.redirect('/squads');
        })
        .catch(err => {
            console.log(err);
        });
};