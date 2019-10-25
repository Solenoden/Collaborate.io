const categories = [
    "Design",
    "Web",
    "Mobile",
    "Game",
    "AI",
    "Data Science",
]

const projectCategories = [
    "Web",
    "Mobile",
    "Game"
]

const subCategories = [
    "UI Designer",
    "UX Designer",
    "Graphics Designer",

    "Front-end",
    "Back-end",
    
    "Game Programmer",
    "Game Artist",

    "Machine Learning",
    "Computer Vision",
    "Natural Language Proccessing",
]

const getCategories = () => {
    return categories;
}

const getProjectCategories = () => {
    return projectCategories;
}

const getSubCategories = () => {
    return subCategories;
}

module.exports = {getCategories, getSubCategories, getProjectCategories};