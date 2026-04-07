(function () {
  const yearTarget = document.getElementById("year");
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  function renderSections() {
    const renderMap = {
      hero: window.renderHero,
      about: window.renderAbout,
      skills: window.renderSkills,
      projects: window.renderProjects,
      experience: window.renderExperience,
      contact: window.renderContact,
    };

    document.querySelectorAll("[data-render]").forEach(function (section) {
      const renderType = section.getAttribute("data-render");
      if (renderMap[renderType]) {
        if (renderType === "projects") {
          renderMap[renderType](section, "all");
        } else {
          renderMap[renderType](section);
        }
      }
    });

    const projectsSection = document.querySelector('[data-render="projects"]');
    if (projectsSection) {
      projectsSection.addEventListener("click", function (event) {
        const button = event.target.closest("[data-filter]");
        if (!button) {
          return;
        }

        const nextFilter = button.getAttribute("data-filter");
        window.renderProjects(projectsSection, nextFilter);
      });
    }
  }

  function renderBlogPage() {
    const blogContainer = document.querySelector('[data-render="blog-list"]');
    if (blogContainer && window.renderBlogList) {
      window.renderBlogList(blogContainer, "all");

      blogContainer.addEventListener("click", function (event) {
        const button = event.target.closest("[data-filter]");
        if (!button) {
          return;
        }

        window.renderBlogList(
          blogContainer,
          button.getAttribute("data-filter"),
        );
      });
    }

    const postContainer = document.querySelector('[data-render="blog-post"]');
    if (postContainer && window.renderBlogPost) {
      const params = new URLSearchParams(window.location.search);
      window.renderBlogPost(postContainer, params.get("post"));
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      renderSections();
      renderBlogPage();
    });
  } else {
    renderSections();
    renderBlogPage();
  }
})();
