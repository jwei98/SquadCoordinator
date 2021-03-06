const Squad = require('../models/Squad');

exports.getLineup = (req, res, next) => {
    req.user.getLineup()
        .then(lineup => {
            return lineup.getSquads();
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
            // if we haven't added this squad to the linep yet
            if (squads.length === 0) {
                return Squad.findByPk(squadId);
            } else {
                return squads[0];
            }
        })
        .then(squad => {
            return userLineup.addSquad(squad)
                .then(result => res.redirect('/lineup'))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

};

// TODO: leaving a squad should remove it from lineup but not delete it from squads table
exports.postRemoveFromLineup = (req, res, next) => {
    const squadId = req.body.id;
    req.user.getLineup()
        .then(lineup => {
            return lineup.getSquads({
                where: {
                    id: squadId
                }
            });
        })
        .then(squads => {
            const squad = squads[0];
            return squad.lineupItem.destroy();
        })
        .then(result => {
            res.redirect('/lineup');
        })
        .catch(err => console.log(err));
};