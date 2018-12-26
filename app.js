// imports
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./utils/database');

// meta setup
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// mock user setup
app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

// routes
const squadRoutes = require('./routes/squadRoutes');
const lineupRoutes = require('./routes/lineupRoutes');
const errorController = require('./controllers/errorController');

app.use(squadRoutes);
app.use(lineupRoutes);
app.use(errorController.errorPage);

// sequelize setup
const Squad = require('./models/Squad');
const User = require('./models/User');
const Lineup = require('./models/Lineup');
const LineupItem = require('./models/LineupItem');

User.hasMany(Squad);
Squad.belongsTo(User);

User.hasOne(Lineup);
Lineup.belongsTo(User);

Lineup.belongsToMany(Squad, {
    through: LineupItem
});
Squad.belongsToMany(Lineup, {
    through: LineupItem
});

sequelize.sync()
    .then(res => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            // create dummy user
            return User.create({
                name: "Justin",
                email: "justin@test.com"
            })
        }
        // return user as promise
        return user;
    })
    .then(user => {
        Lineup.findByPk(1)
            .then(lineup => {
                if (!lineup) {
                    user.createLineup()
                }
                // return user as promise
                return lineup;
            })
            .catch(err => console.log(err));
    })
    .then(lineup => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    });