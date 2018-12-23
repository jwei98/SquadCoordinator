const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'squads.json'
);

const getSquadsFromFile = (callback) => {
    fs.readFile(p, (err, content) => {
        if (err) {
            return callback([]);
        } else {
            return callback(JSON.parse(content));
        }
    });
};

module.exports = class Squads {

    static addFlight(flight) {
        getSquadsFromFile(squads => {
            squads.push(flight);
            fs.writeFile(p, JSON.stringify(squads), (error) => {
                console.log(error);
            });
        });
    }

    static getAllSquads(callback) {
        getSquadsFromFile(squads => callback(squads));
    }

    static deleteFlightFromSquad(id) {
        getSquadsFromFile((squads) => {
            const flightInd = squads.findIndex(flight => flight.id === id);
            if (flightInd >= 0) squads.splice(flightInd,1);
            fs.writeFile(p, JSON.stringify(squads), (error) => {
                console.log(error);
            });
        });
    }

};