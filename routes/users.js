const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((req, res) => {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => console.log("ERROR: " + err));
});

router.route("/basicAuth").post((req, res) => {
    User.findOne({email: req.body.email, password: req.body.password})
    .then((user) => res.json(user))
    .catch((err) => console.log("ERROR: " + err));
});

router.route("/:id").get((req, res) => {
    User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => console.log("ERROR: " + err));
});



router.route("/new").post((req, res) => {
    const newUser = new User({
        email: req.body.email,
        fullName: req.body.fullName,
        username: req.body.username,
        password: req.body.password,
        skills: req.body.skills,
        devCategories: req.body.devCategories,
        subDevCategories: req.body.subDevCategories,
        profileDescription: req.body.profileDescription,
        profilePic: req.body.profilePic,
        friends: req.body.friends,
        notifications: req.body.notifications
    });

    newUser.save()
    .then(() => res.json("Successfully added user."))
    .catch((err) => console.log("ERROR: " + err));
});

router.route("/edit/:id").post((req, res) => {
    User.findById(req.params.id)
    .then((user) => {
        // user.email = req.body.email;
        user.fullName = req.body.fullName;
        // user.username = req.body.username
        user.password = req.body.password;
        user.skills = req.body.skills;
        user.devCategories = req.body.devCategories;
        user.subDevCategories = req.body.subDevCategories;
        user.profileDescription = req.body.profileDescription;
        user.profilePic = req.body.profilePic;
        user.friends = req.body.friends;
        user.notifications = req.body.notifications;

        user.save()
        .then(() => res.json("Successfully updated user's information."))
        .catch((err) => console.log("ERROR: " + err));
    })
    .catch((err) => console.log("ERROR: " + err));
});

module.exports = router;