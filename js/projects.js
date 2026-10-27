
async function loadProjects() {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
        throw new Error("Failed to load projects");
    }

    const data = await response.json();

    const categories = {
        selected: {
            section: document.getElementById("selected-section"),
            container: document.getElementById("selected-projects")
        },
        pet: {
            section: document.getElementById("pet-section"),
            container: document.getElementById("pet-projects")
        },
        archive: {
            section: document.getElementById("archive-section"),
            container: document.getElementById("archive-projects")
        }
    };

    for (const project of data.projects) {
        const category = categories[project.category];

        if (!category) {
            console.warn("Unknown project category:", project.category);
            continue;
        }

        const card = document.createElement("a");
        card.className = "project-item";
        card.href = project.url;

        // Year and status
        const yearBlock = document.createElement("div");
        yearBlock.className = "project-year-block";

        const year = document.createElement("span");
        year.className = "project-year";
        year.textContent = project.year;

        const status = createProjectStatus(project.status);

        yearBlock.appendChild(year);

        if (status) {
            yearBlock.appendChild(status);
        }

        // Project image
        const image = document.createElement("img");
        image.className = "project-thumb";
        image.src = project.image;
        image.alt = project.title;
        image.loading = "lazy";

        // Project name
        const name = document.createElement("div");
        name.className = "project-name";

        const title = document.createElement("span");
        title.className = "project-name-title";
        title.textContent = project.title;

        // Project information
        const info = document.createElement("div");
        info.className = "project-info";

        const description = document.createElement("span");
        description.className = "project-info-desc";
        description.textContent = project.description;

        const technologies = document.createElement("span");
        technologies.className = "project-info-tags";
        technologies.textContent = project.technologies.join(", ");

        // Arrow
        const arrow = document.createElement("span");
        arrow.className = "project-arrow";
        arrow.textContent = "→";
        arrow.setAttribute("aria-hidden", "true");

        // Build project card
        name.appendChild(title);

        info.append(
            description,
            technologies
        );

        card.append(
            yearBlock,
            image,
            name,
            info,
            arrow
        );

        category.container.appendChild(card);
    }

    // Hide empty project sections
    for (const category of Object.values(categories)) {
        category.section.hidden =
            category.container.children.length === 0;
    }
}

loadProjects().catch(error => {
    console.error("Projects loading error:", error);
});
