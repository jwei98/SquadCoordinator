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

};