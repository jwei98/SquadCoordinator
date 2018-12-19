const Flight = require('../models/Flight');
const Squads = require('../models/Squads');

exports.getHome = (req, res, next) => {
    const homePageData = {
        pageTitle: 'Home',
        path: '/'
    };
    res.render('home', homePageData);
};

exports.getFlights = (req, res, next) => {
    Flight.getAllFlights((flights) => {
        const flightPageData = {
            pageTitle: 'Flights',
            path: '/flights',
            flights: flights
        };
        res.render('flights', flightPageData);
    });
};

exports.getEditFlight = (req, res, next) => {
    const id = req.params.id;
    const flight = Flight.findById(id, (flight) => {
        res.render('edit-flight', {
            pageTitle: "Editing Flight",
            path: "/edit-flight",
            flight: flight
        })
    });
};

exports.getFlightById = (req, res, next) => {
    const id = req.params.id;
    const flight = Flight.findById(id, (flight) => {
        res.render('flight', {
            pageTitle: "Join Squad?",
            path: "/flights",
            flight: flight
        })
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
const createFlight = (flightId, dt) => {
    const dateTime = new Date(dt);
    const newFlight = new Flight(flightId, dateTime);
    newFlight.save();
};

exports.postFlight = (req, res, next) => {
    createFlight(null, req.body.flightDateTime);
    res.redirect('/flights');
};

exports.postEditFlight = (req, res, next) => {
    createFlight(req.body.flightId, req.body.flightDateTime);
    res.redirect('/flights');
};

exports.postSquad = (req, res, next) => {
    const flightId = req.body.flightId;
    Flight.findById(flightId, (flight) => {
        Squads.addFlight(flight);
        res.redirect('/squads');
    });
};