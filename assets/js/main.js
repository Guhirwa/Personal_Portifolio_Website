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
      experience: window.renderExperience,
      contact: window.renderContact,
    };

    document.querySelectorAll("[data-render]").forEach(function (section) {
      const renderType = section.getAttribute("data-render");
      if (renderMap[renderType]) {
        renderMap[renderType](section);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderSections);
  } else {
    renderSections();
  }
})();
