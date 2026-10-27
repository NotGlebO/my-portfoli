async function loadProjectDetails() {
    const container = document.getElementById("project-detail-status");

    if (!container) return;

    const projectId = container.dataset.projectId;

    if (!projectId) {
        console.warn("Missing data-project-id");
        return;
    }

    const response = await fetch("../data/projects.json");

    if (!response.ok) {
        throw new Error("Failed to load project data");
    }

    const data = await response.json();

    const project = data.projects.find(
        item => item.id === projectId
    );

    if (!project) {
        console.warn("Project not found:", projectId);
        return;
    }

    const badge = createProjectStatus(project.status);

    if (badge) {
        container.replaceChildren(badge);
    }
}

loadProjectDetails().catch(error => {
    console.error("Failed to load project details:", error);
});