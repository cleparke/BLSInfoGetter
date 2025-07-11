// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const resultsDiv = document.getElementById("results");
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", () => {
    const text = searchInput.value;
    resultsDiv.textContent = `You typed: "${text}"`;
  });
});
