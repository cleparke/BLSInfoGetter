document.addEventListener("DOMContentLoaded", () => {
  const data = [
    { title: "Software Developer", code: "15-1252" },
    { title: "Data Analyst", code: "15-2041" },
    { title: "Mechanical Engineer", code: "17-2141" }
  ];

  const searchInput = document.getElementById("search");
  const resultsDiv = document.getElementById("results");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsDiv.textContent = "No results found.";
      return;
    }

    resultsDiv.innerHTML = filtered
      .map(item => `<div><strong>${item.title}</strong> — ${item.code}</div>`)
      .join("");
  });
});
