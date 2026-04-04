window.safeQuery = function safeQuery(selector) {
  return document.querySelector(selector);
};

window.renderHero = function renderHero(container) {
  const data = window.PORTFOLIO_DATA;
  container.classList.add("hero-section");
  container.innerHTML = `
    <div class="container">
      <h1>${data.profile.name}</h1>
      <p>${data.profile.tagline}</p>
      <p class="hero-meta">Address: ${data.profile.address} | Phone: ${data.profile.phone}</p>
      <a class="btn" href="mailto:${data.profile.email}">Contact Me</a>
    </div>
  `;
};

window.renderAbout = function renderAbout(container) {
  const data = window.PORTFOLIO_DATA;
  container.innerHTML = `
    <div class="container content-block">
      <h2>About</h2>
      <p>${data.about.intro}</p>
      <p>${data.about.summary}</p>
    </div>
  `;
};

window.renderSkills = function renderSkills(container) {
  const data = window.PORTFOLIO_DATA;
  container.innerHTML = `
    <div class="container content-block">
      <h2>Skills Summary</h2>
      <div class="skills-grid">
        <div>
          <h3>Technical Skills</h3>
          <ul>${data.skills.technical.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Professional Skills</h3>
          <ul>${data.skills.professional.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
        <div>
          <h3>Languages</h3>
          <ul>${data.skills.languages.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
      </div>
    </div>
  `;
};

window.renderExperience = function renderExperience(container) {
  const data = window.PORTFOLIO_DATA;
  container.innerHTML = `
    <div class="container content-block">
      <h2>Experience and Education</h2>
      <ul>${data.experience.map((e) => `<li>${e}</li>`).join("")}</ul>
    </div>
  `;
};

window.renderContact = function renderContact(container) {
  const data = window.PORTFOLIO_DATA;
  container.innerHTML = `
    <div class="container content-block">
      <h2>Contact</h2>
      <p>Email: <a href="mailto:${data.profile.email}">${data.profile.email}</a></p>
      <p>Phone: <a href="tel:${data.profile.phone.replace(/\s/g, "")}">${data.profile.phone}</a></p>
      <p>Address: ${data.profile.address}</p>
      <p>LinkedIn: <a href="#">View My Profile</a></p>
      <p>GitHub: <a href="#">View My Profile</a></p>
    </div>
  `;
};

window.getProjectFilters = function getProjectFilters() {
  const projects = window.PORTFOLIO_DATA.projects || [];
  const categories = new Set(["all"]);

  projects.forEach(function (project) {
    if (project.category) {
      categories.add(project.category);
    }
  });

  return Array.from(categories);
};

window.renderProjects = function renderProjects(container, activeFilter) {
  const projects = window.PORTFOLIO_DATA.projects || [];
  const filterValue = activeFilter || "all";
  const filteredProjects = projects.filter(function (project) {
    return filterValue === "all" || project.category === filterValue;
  });

  const filterButtons = window
    .getProjectFilters()
    .map(function (filter) {
      const isActive = filter === filterValue;
      return `
        <button class="filter-btn${isActive ? " is-active" : ""}" type="button" data-filter="${filter}">
          ${filter === "all" ? "All Projects" : filter.toUpperCase()}
        </button>
      `;
    })
    .join("");

  const projectCards = filteredProjects
    .map(function (project) {
      return `
        <article class="project-card">
          <div class="project-card__body">
            <span class="project-card__tag">${project.role}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <ul class="project-tags">
              ${project.technology
                .map(function (tech) {
                  return `<li>${tech}</li>`;
                })
                .join("")}
            </ul>
          </div>
          <div class="project-card__actions">
            <a class="btn" href="${project.liveLink}">Live Site</a>
            <a class="btn btn-secondary" href="${project.githubLink}">GitHub</a>
          </div>
        </article>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="container content-block">
      <h2>Projects Showcase</h2>
      <p>Selected work across web interfaces, tooling ideas, and responsive UI concepts.</p>
      <div class="filter-row" data-project-filters>${filterButtons}</div>
      <div class="projects-grid" data-project-grid>
        ${projectCards || '<p class="empty-state">No projects found for this filter.</p>'}
      </div>
    </div>
  `;
};
