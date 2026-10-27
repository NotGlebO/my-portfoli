async function loadProjectDetails() {
    const response = await fetch("../data/projects.json");

    if (!response.ok) {
        throw new Error("Failed to load project data");
    }

    const data = await response.json();

    const project = data.projects.find(
        item => item.id === "unified-inbox"
    );

    if (!project) {
        return;
    }

    const container = document.getElementById(
        "project-detail-status"
    );

    if (!container) {
        return;
    }

    const badge = createProjectStatus(project.status);

    if (badge) {
        container.appendChild(badge);
    }
}

loadProjectDetails().catch(error => {
    console.error("Failed to load project details:", error);
});