window.getSimpleRecommendation = function getSimpleRecommendation(interests) {
  if (!Array.isArray(interests) || interests.length === 0) {
    return "Select one or more interests to get a recommendation.";
  }
  return "Recommended focus: " + interests[0] + " project.";
};
