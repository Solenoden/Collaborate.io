import React from 'react';
import allSkills from "./allSkills";
import allCategories from "./allCategories";

export default function allOptions() {
    return (
        <div>
            
        </div>
    )
}

export function SkillOptions() {
    let render = [];

    for(let [key, value] of Object.entries(allSkills.getSkills())) {
        value.forEach((skill) => {
            render.push(<option key={skill}>{skill}</option>);
        });
    }


    return render;
}

export function CategoryOptions() {
    return allCategories.getCategories().map((category) => {
        return <option key={category}>{category}</option>;
    });
}

export function SubCategoryOptions() {
    return allCategories.getSubCategories().map((subCategory) => {
        return <option key={subCategory}>{subCategory}</option>
    });
}

export function ProjectCategoryOptions() {
    return allCategories.getProjectCategories().map((category) => {
        return <option key={category}>{category}</option>
    });
}
 