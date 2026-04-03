(function () {
  const yearTarget = document.getElementById("year");
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }
})();
