let allData = [];
// Update Payscale link
const payscaleBtn = document.getElementById("payscaleBtn");
if (query.trim()) {
  const encoded = encodeURIComponent(query.trim());
  payscaleBtn.onclick = () => {
    const url = `https://www.payscale.com/rcsearch.aspx?category=&str=${encoded}&CountryName=United+States&SourceId=Job`;
    window.open(url, "_blank");
  };
  payscaleBtn.disabled = false;
} else {
  payscaleBtn.onclick = null;
  payscaleBtn.disabled = true;
}
// Load the JSON once when the page loads
window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("2024BLS.json");
  allData = await response.json();

  // Attach live search behavior
  document.getElementById("searchBox").addEventListener("input", updateResults);
  document.getElementById("statForm").addEventListener("change", updateResults);
});

function updateResults() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  const checkedStats = Array.from(document.querySelectorAll('input[name="stat"]:checked'))
    .map(cb => cb.value);

  // Filter matching occupations
  const matches = allData.filter(item =>
    item.Occupations.toLowerCase().includes(query)
  );

  // Build results HTML
  if (matches.length > 0) {
    resultDiv.innerHTML = matches.map(match => {
      let statList = checkedStats.map(stat =>
        `<li><strong>${stat}:</strong> ${match[stat] ?? "N/A"}</li>`
      ).join("");

      return `
        <div class="result">
          <h2>${match.Occupations}</h2>
          <ul>${statList}</ul>
        </div>
      `;
    }).join("");
  } else {
    resultDiv.innerHTML = `<p>No matches found.</p>`;
  }
}
