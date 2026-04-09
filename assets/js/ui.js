window.safeQuery = function safeQuery(selector) {
  return document.querySelector(selector);
};

window.toFilterSlug = function toFilterSlug(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
};

window.renderHero = function renderHero(container) {
  const data = window.PORTFOLIO_DATA;
  const heroImage = data.profile.image
    ? `<img class="profile-image" src="${data.profile.image}" alt="${data.profile.name} profile photo" />`
    : `<div class="profile-image-placeholder" aria-label="Profile image placeholder">
        <span>Profile Image Space</span>
      </div>`;

  container.classList.add("hero-section");
  container.innerHTML = `
    <div class="container hero-layout">
      ${heroImage}
      <div class="hero-copy">
        <p class="hero-kicker">${data.profile.title}</p>
        <h1>${data.profile.name}</h1>
        <p>${data.profile.tagline}</p>
        <p class="hero-meta">Address: ${data.profile.address} | Phone: ${data.profile.phone}</p>
        <div class="hero-actions">
          <a class="btn" href="mailto:${data.profile.email}">Contact Me</a>
          <a class="btn btn-secondary" href="${data.profile.cvDownloadUrl}" download>Download CV</a>
        </div>
      </div>
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
      <div class="contact-grid">
        <div class="contact-details">
          <p>Email: <a href="mailto:${data.profile.email}">${data.profile.email}</a></p>
          <p>Phone: <a href="tel:${data.profile.phone.replace(/\s/g, "")}">${data.profile.phone}</a></p>
          <p>Address: ${data.profile.address}</p>
          <div class="social-links">
            ${data.contact.socialLinks
              .map(function (link) {
                const variant = window.toFilterSlug(link.label);
                const url = link.url.startsWith("http")
                  ? link.url
                  : `https://${link.url}`;
                return `<a class="social-link social-link--${variant}" href="${url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
              })
              .join("")}
          </div>
        </div>
        <form class="contact-form" data-contact-form>
          <div class="form-field">
            <label for="name">Name</label>
            <input id="name" name="name" type="text" placeholder="Your name" />
          </div>
          <div class="form-field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" />
          </div>
          <div class="form-field">
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Write your message here"></textarea>
          </div>
          <button class="btn" type="submit">Send Message</button>
          <p class="form-message" data-form-message aria-live="polite"></p>
        </form>
      </div>
    </div>
  `;
};

window.validateContactForm = function validateContactForm(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Please enter at least 2 characters.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(values.email || "")) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = "Please enter at least 10 characters.";
  }

  return errors;
};

window.getProjectFilters = function getProjectFilters() {
  const projects = window.PORTFOLIO_DATA.projects || [];
  const categories = new Set(["all"]);

  projects.forEach(function (project) {
    if (project.category) {
      categories.add(project.category);
    }
    if (project.role) {
      categories.add(window.toFilterSlug(project.role));
    }
    (project.technologies || []).forEach(function (technology) {
      categories.add(window.toFilterSlug(technology));
    });
  });

  return Array.from(categories);
};

window.getBlogFilters = function getBlogFilters() {
  const posts = window.PORTFOLIO_DATA.blogPosts || [];
  const categories = new Set(["all"]);

  posts.forEach(function (post) {
    if (post.category) {
      categories.add(post.category);
    }
  });

  return Array.from(categories);
};

window.renderFilterButtons = function renderFilterButtons(
  filters,
  activeFilter,
  labelMap,
) {
  return filters
    .map(function (filter) {
      const isActive = filter === activeFilter;
      const label =
        labelMap && labelMap[filter] ? labelMap[filter] : filter.toUpperCase();
      return `
        <button class="filter-btn${isActive ? " is-active" : ""}" type="button" data-filter="${filter}">
          ${label}
        </button>
      `;
    })
    .join("");
};

window.renderProjects = function renderProjects(container, activeFilter) {
  const projects = window.PORTFOLIO_DATA.projects || [];
  const filterValue = activeFilter || "all";
  const filteredProjects = projects.filter(function (project) {
    return (
      filterValue === "all" ||
      project.category === filterValue ||
      window.toFilterSlug(project.role || "") === filterValue ||
      (project.technologies || []).some(function (technology) {
        return window.toFilterSlug(technology) === filterValue;
      })
    );
  });

  const filterButtons = window.renderFilterButtons(
    window.getProjectFilters(),
    filterValue,
    {
      all: "All Projects",
      web: "Web",
      ui: "UI",
      tooling: "Tooling",
      javascript: "JavaScript",
      css: "CSS",
      html: "HTML",
      "frontend-developer": "Frontend",
      "ui-developer": "UI Role",
      "interface-designer": "Design Role",
      "product-builder": "Product Role",
      "responsive-design": "Responsive",
      "ui-logic": "UI Logic",
      "css-grid": "CSS Grid",
    },
  );

  const projectCards = filteredProjects
    .map(function (project) {
      return `
        <article class="project-card">
          <div class="project-card__body">
            <span class="project-card__tag">${project.role}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <ul class="project-tags">
              ${project.technologies
                .map(function (tech) {
                  return `<li>${tech}</li>`;
                })
                .join("")}
            </ul>
          </div>
          <div class="project-card__actions">
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

window.renderBlogList = function renderBlogList(container, activeFilter) {
  const posts = window.PORTFOLIO_DATA.blogPosts || [];
  const filterValue = activeFilter || "all";
  const filteredPosts =
    filterValue === "all"
      ? posts
      : posts.filter(function (post) {
          return post.category === filterValue;
        });

  const filterButtons = window.renderFilterButtons(
    window.getBlogFilters(),
    filterValue,
    {
      all: "All Posts",
      design: "Design",
      development: "Development",
      css: "CSS",
    },
  );

  const postCards = filteredPosts
    .map(function (post) {
      return `
        <article class="post-card">
          <div class="post-card__meta">
            <span>${post.category}</span>
            <span>${post.date}</span>
          </div>
          <h3><a href="post.html?post=${post.id}">${post.title}</a></h3>
          <p>${post.excerpt}</p>
          <a class="btn btn-secondary" href="post.html?post=${post.id}">Read More</a>
        </article>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="container content-block">
      <h2>Blog</h2>
      <p>Short notes and practical reflections from software engineering work.</p>
      <div class="filter-row" data-blog-filters>${filterButtons}</div>
      <div class="posts-grid">
        ${postCards || '<p class="empty-state">No posts found for this filter.</p>'}
      </div>
    </div>
  `;
};

window.renderBlogPost = function renderBlogPost(container, postId) {
  const posts = window.PORTFOLIO_DATA.blogPosts || [];
  const post =
    posts.find(function (item) {
      return item.id === postId;
    }) || posts[0];

  if (!post) {
    container.innerHTML = `
      <div class="container content-block">
        <h2>Post Not Found</h2>
        <p>The article you selected does not exist.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="container content-block blog-post">
      <p class="post-card__meta">
        <span>${post.category}</span>
        <span>${post.date}</span>
      </p>
      <h1>${post.title}</h1>
      <p>${post.excerpt}</p>
      ${post.content
        .map(function (paragraph) {
          return `<p>${paragraph}</p>`;
        })
        .join("")}
      <pre class="code-block"><code>${post.codeSnippet}</code></pre>
      <a class="btn btn-secondary" href="blog.html">Back to Blog</a>
    </div>
  `;
};
