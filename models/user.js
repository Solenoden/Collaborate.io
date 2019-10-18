const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {type: String, unique: true, required: true},
    fullName: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    skills: {type: Array, required: false, default: []},
    devCategories: {type: Array, required: true},
    devSubCategories: {type: Array, required: true},
    profileDescription: {type: String, required: false, default: "No Description"},
    profilePic: {type: String, required: false, default: "https://cdn-prod.medicalnewstoday.com/content/images/articles/279/279359/eggplants.jpg"},
    friends: {type: Array, required: false},
    notifications: [
        {
            notificationType: {type: String, required: false, default: "Basic"} ,
            title: {type: String, required: true},
            description: {type: String, required: false}
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User