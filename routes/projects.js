const router = require("express").Router();
let Project = require("../models/project");

router.route("/").get((req, res) => {
    Project.find()
    .then((projects) => res.json(projects))
    .catch((err) => console.log("ERROR: " + err));
});

router.route("/:id").get((req, res) => {
    Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => console.log("ERROR: " + err));
})

router.route("/new").post((req, res) => {
    const newProject = new Project({
        title: req.body.title,
        categories: req.body.categories,
        // status: req.body.status,
        dateStarted: req.body.dateStarted,
        // dateEnded: req.body.dateEnded,
        description: req.body.description,
        // technologies: req.body.technologies,
        // images: req.body.technologies,
        devTeam: req.body.devTeam
    });

    newProject.save()
    .then(() => res.json(newProject._id))
    .catch((err) => console.log("ERROR: " + err));
});


router.route("/edit/:id").post((req, res) => {
    Project.findById(req.params.id)
    .then((project) => {
        project.title = req.body.title;
        project.categories = req.body.categories;
        project.status = req.body.status;
        project.dateStarted = req.body.dateStarted;
        project.dateEnded = req.body.dateEnded;
        project.description = req.body.description;
        project.technologies = req.body.technologies;
        project.images = req.body.images;
        project.devTeam = req.body.devTeam;
        project.vacancies = req.body.vacancies;
        project.gitHubLink = req.body.gitHubLink;
        project.websiteLink = req.body.websiteLink;

        project.save()
        .then(() => res.json("Successfully updated project's information."))
        .catch((err) => console.log("ERROR: " + err));
    })
    .catch((err) => console.log("ERROR: " + err));
});

module.exports = router;