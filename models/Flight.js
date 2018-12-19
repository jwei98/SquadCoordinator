const fs = require('fs');
const path = require('path');
const monthNames = ["", "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'flights.json'
);

const getFlightsFromFile = (callback) => {
    fs.readFile(p, (err, data) => {
        if (err) {
            return callback([]);
        } else {
            return callback(JSON.parse(data));
        }
    });
};

const Flight = class {
    constructor(id, dateTime) {
        this.id = id;
        this.dateTime = dateTime;
        this.date = dateTime.toDateString();
        this.time = dateTime.toLocaleTimeString();
    }

    save() {
        getFlightsFromFile((flights) => {
            // if we're updating, we need to replace the flight
            if (this.id) {
                const flightIndex = flights.findIndex(flight => flight.id === this.id);
                flights[flightIndex] = this;
                // otherwise we just add the flight to our list
            } else {
                this.id = Math.random().toString();
                flights.push(this);
            }
            fs.writeFile(p, JSON.stringify(flights), (err) => {
                console.log(err);
            });
        });
    }

    static getAllFlights(callback) {
        getFlightsFromFile(flights => callback(flights));
    }

    static findById(id, callback) {
        getFlightsFromFile((flights) => {
            const flight = flights.find(flight => flight.id === id);
            callback(flight);
        });
    }

    static deleteFlight(id) {
        getFlightsFromFile((flights) => {
            const flightIndex = flights.findIndex(flight => flight.id === id);
            if (flightIndex >= 0) {
                flights.splice(flightIndex,1);
            }
            fs.writeFile(p, JSON.stringify(flights), (err) => {
                console.log(err);
            });

        });
    }
};

module.exports = Flight;