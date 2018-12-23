const Flight = require('../models/Flight');
const Squads = require('../models/Squads');
const User = require('../models/User');

exports.getHome = (req, res, next) => {
    const homePageData = {
        pageTitle: 'Home',
        path: '/'
    };
    res.render('home', homePageData);
};

exports.getFlights = (req, res, next) => {
    Flight.findAll()
        .then(result => {
            const flightsPageData = {
                pageTitle: 'Flights',
                path: '/flights',
                flights: result
            };
            res.render('flights', flightsPageData);
        })
        .catch(err => {
            console.log(err);
        })
};

exports.getEditFlight = (req, res, next) => {
    const id = req.params.id;
    Flight.findByPk(id)
        .then(result => {
            res.render('edit-flight', {
                pageTitle: "Editing Flight",
                path: "/edit-flight",
                flight: result
            })
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getFlightById = (req, res, next) => {
    const id = req.params.id;
    Flight.findByPk(id)
        .then(result => {
            res.render('flight', {
                pageTitle: "Flight " + id,
                path: "/edit-flight",
                flight: result
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
const createFlight = (req) => {
    const dateTime = new Date(req.body.dateTime);
    const capacity = req.body.capacity;
    const rendezvous = req.body.rendezvous;
    const destination = req.body.destination;

    return req.user.createFlight({
        dateTime: dateTime,
        capacity: capacity,
        rendezvous: rendezvous,
        destination: destination,
    });
};

exports.postFlight = (req, res, next) => {
    createFlight(req)
        .then(result => {
            console.log(result);
            res.redirect('/flights');
        })
        .catch(err => {
            console.log(err)
        });
};

exports.postEditFlight = (req, res, next) => {
    const id = req.body.id;
    Flight.findByPk(id)
        .then(flight => {
            flight.dateTime = new Date(req.body.dateTime);
            flight.capacity = req.body.capacity;
            flight.rendezvous = req.body.rendezvous;
            flight.destination = req.body.destination;
            return flight.save();
        })
        .then(result => {
            console.log("UPDATED flight " + id);
            res.redirect('/flights/' + id);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteFlight = (req, res, next) => {
    const id = req.body.id;
    Flight.findByPk(id)
        .then(flight => {
            return flight.destroy();
        })
        .then(result => {
            console.log('DELETED flight ' + id);
            res.redirect('/flights');
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteFlightFromSquad = (req, res, next) => {
    Squads.deleteFlightFromSquad(req.body.id);
    res.redirect('/squads');
};

exports.postSquad = (req, res, next) => {
    const id = req.body.id;
    Flight.findByPk(id, (flight) => {
        Squads.addFlight(flight);
        res.redirect('/squads');
    });
};