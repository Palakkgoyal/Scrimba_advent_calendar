import { projects } from "./data";
import { imagesArr } from "/assets/index.js"

const projectsHtml = projects.map((project, idx) => (
   `<li class="project">
        <a href="/day${idx+1}/index.html">
            <img src="${imagesArr[idx]}" alt=${project.name}>
            <h4>${project.name}</h4>
            <ul class="tech-stacks-container">
                ${project.techStacks.map(techStack => (
                    `<li class="tech-stack">${techStack}</li>`
                )).join("")}
            </ul>
        </a>
    </li>`
)).join("")


document.getElementById("project-container").innerHTML = projectsHtml
