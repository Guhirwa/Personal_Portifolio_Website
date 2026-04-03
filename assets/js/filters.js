window.filterByCategory = function filterByCategory(items, category) {
  if (!Array.isArray(items)) return [];
  if (!category || category === "all") return items;
  return items.filter(function (item) {
    return item && item.category === category;
  });
};
