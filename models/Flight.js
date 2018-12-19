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
    constructor(date, time) {
        this.time = time;
        this.date = date;
        this.id = Math.random().toString();
    }

    save() {
        getFlightsFromFile((flights) => {
            flights.push(this);
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
};

module.exports = Flight;