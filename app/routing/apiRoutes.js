var friendsList = require("../data/friends");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendsList);
    });

    app.post("/api/friends", function (req, res) {
        var newUser = req.body;

        var currBest = friendsList[0];
        var currBestScore = 0

        for (var i = 0; i < friendsList.length; i++) {
            var compatScore = 0;
            var currUser = friendsList[i];
            for (var j = 0; j < currUser.scores; j++) {
                compatScore += Math.abs(currUser[j] - req.body.scores[j]);
            }
            if (compatScore > currBestScore) {
                currBest = currUser;
                currBestScore = compatScore;
            }
        }

        // code to show best user in modal

        friendsList.push(newUser);
    });
};