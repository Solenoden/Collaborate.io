const skills = {
    General: [
        "C#",
        "C",
        "C++",
        "CouchDB",
        "Docker",
        "Dot Net",
        "Git",
        "Go",
        "Gradle",
        "Java",
        "JavaScript",
        "MongoDB",
        "MySQL",
        "PostgreSQL",
        "Python",
        "Ruby",
        
    ],
    Design: [
        "Adobe Illustrator",
        "Behance",
        "Gimp",
        "Photoshop",
        "Sketch"
    ],
    Web: [
        "Angular",
        "Apache",
        "AWS",
        "Babel",
        "Backbone",
        "Bootstrap",
        "Bower",
        "CakePHP",
        "CSS",
        "D3JS",
        "Django",
        "Doctrine",
        "Drupal",
        "Electron",
        "Express",
        "Grunt",
        "Gulp",
        "Heroku",
        "HTML",
        "jQuery",
        "KrakenJS",
        "Laravel",
        "Node",
        "NPM",
        "PHP",
        "Rails",
        "React",
        "Redux",
        "SASS",
        "SSH",
        "Symfony",
        "Tomcat",
        "TypeScript",
        "Vue",
        "Webpack",
        "WordPress",
        "Yarn"
    ],
    Mobile: [
        "Android",
        "Ionic",
        "Swift",
    ],
    Game: [],
    AI: []
}

const getIconPath = (skill) => {
    return "/images/icons/" + skill.toLowerCase() + ".svg";
}

const getSkills = () => {
    return skills;
}

module.exports = {getSkills, getIconPath};