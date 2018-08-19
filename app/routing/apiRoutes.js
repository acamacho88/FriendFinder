var friends = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newUser = req.body;

        for (var i = 0; i < newUser.scores.length; i++) {
            newUser.scores[i] = parseInt(newUser.scores[i]);
        }

        console.log(newUser);

        var currBest = friends[0];
        var currBestScore = 100

        for (var i = 0; i < friends.length; i++) {
            var compatScore = 0;
            var currUser = friends[i];

            for (var j = 0; j < currUser.scores.length; j++) {
                compatScore += Math.abs(currUser.scores[j] - newUser.scores[j]);
            }
            if (compatScore < currBestScore) {
                currBest = currUser;
                currBestScore = compatScore;
            }
        }

        friends.push(newUser);

        res.send(currBest);
    });
};