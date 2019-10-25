const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {type: String, required: true},
    categories: {type: Array, required: true},
    status: {type: String, required: false, default: "Development"},
    dateStarted: {type: String, required: true},
    dateEnded: {type: String, required: false},
    description: {type: String, required: false, default: "No description"},
    technologies: {type: Array, required: false, default: ["No technologies"]},
    images: [
        {
            image: {type: String, required: true},
            imageTitle: {type: String, required: false},
            imageDesc: {type: String, required: false}
        }
    ],
    devTeam: [
        {
            developerID: {type: String, required: true},
            position: {type: String, required: true},
            dateStarted: {type: String, required: true},
        }
    ],
    vacancies: [
        {
            position: {type: String, required: true},
            skills: {type: Array, required: true},
            datePosted: {type: String, required: true},
        }
    ], 
    gitHubLink: {type: String, required: false},
    websiteLink: {type: String, required: false},
}, 
{
    timestamps: true
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;