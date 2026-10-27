const PROJECT_STATUSES = {
    archived: "Archived",
    development: "In Development",
    production: "Production"
};

function createProjectStatus(status) {
    const label = PROJECT_STATUSES[status];

    if (!label) {
        return null;
    }

    const badge = document.createElement("span");

    badge.className =
        `project-status project-status--${status}`;

    badge.textContent = label;

    return badge;
}