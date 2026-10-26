async function loadProjects() {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
        throw new Error("Failed to load projects");
    }

    const data = await response.json();

    const selectedContainer =
        document.getElementById("selected-projects");

    const archiveContainer =
        document.getElementById("archive-projects");

    for (const project of data.projects) {
        const container = project.category === "archive"
            ? archiveContainer
            : selectedContainer;

        const card = document.createElement("a");
        card.className = "project-item";
        card.href = project.url;

        const year = document.createElement("span");
        year.className = "project-year";
        year.textContent = project.year;

        const image = document.createElement("img");
        image.className = "project-thumb";
        image.src = project.image;
        image.alt = project.title;

        const name = document.createElement("div");
        name.className = "project-name";

        const title = document.createElement("span");
        title.className = "project-name-title";
        title.textContent = project.title;

        const info = document.createElement("div");
        info.className = "project-info";

        const description = document.createElement("span");
        description.className = "project-info-desc";
        description.textContent = project.description;

        const technologies = document.createElement("span");
        technologies.className = "project-info-tags";
        technologies.textContent = project.technologies.join(", ");

        const status = document.createElement("span");
        status.className = "project-info-industry";
        status.textContent = project.status;

        const arrow = document.createElement("span");
        arrow.className = "project-arrow";
        arrow.textContent = "→";
        arrow.setAttribute("aria-hidden", "true");

        name.appendChild(title);

        info.append(
            description,
            technologies,
            status
        );

        card.append(
            year,
            image,
            name,
            info,
            arrow
        );

        container.appendChild(card);
    }

    if (archiveContainer.children.length > 0) {
        document.getElementById("archive-section").hidden = false;
    }
}

loadProjects().catch(error => {
    console.error("Projects loading error:", error);

    const container = document.getElementById("selected-projects");

    if (container) {
        container.textContent = "Unable to load projects.";
    }
});