const Flight = require('../models/Flight');
const Squads = require('../models/Squads');

exports.home = (req, res, next) => {
    const homePageData = {
        pageTitle: 'Home',
        path: '/'
    };
    res.render('home', homePageData);
};

exports.flights = (req, res, next) => {
    Flight.getAllFlights((flights) => {
        console.log(flights);
        const flightPageData = {
            pageTitle: 'Flights',
            path: '/flights',
            flights: flights
        };
        res.render('flights', flightPageData);
    });
};

exports.flightById = (req, res, next) => {
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
exports.addFlight = (req, res, next) => {
    const dateTime = new Date(req.body.flightDateTime);
    const date = dateTime.toDateString();
    const time = dateTime.toLocaleTimeString();
    const newFlight = new Flight(date, time);
    newFlight.save();
    res.redirect('/flights');
};

exports.addSquad = (req, res, next) => {
    const flightId = req.body.flightId;
    Flight.findById(flightId, (flight) => {
        Squads.addFlight(flight);
        res.redirect('/squads');
    });
};