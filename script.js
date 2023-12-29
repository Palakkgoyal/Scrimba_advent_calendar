import { projects } from "./data";

const projectsHtml = projects.map((project, idx) => (
    `<li class="project">
        <a href="/day${idx+1}/index.html">
            <img src="assets/day${idx+1}.png" alt=${project.name}>
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
