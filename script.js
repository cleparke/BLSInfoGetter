async function search() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const resultDiv = document.getElementById("result");

  // Load JSON data
  const response = await fetch("data.json");
  const data = await response.json();

  // Get selected fields from checkboxes
  const checkedStats = Array.from(document.querySelectorAll('input[name="stat"]:checked'))
    .map(cb => cb.value);

  // Search for the first match
  const match = data.find(item =>
    item.Occupations.toLowerCase().includes(query)
  );

  if (match) {
    let html = `<h2>${match.Occupations}</h2><ul>`;
    checkedStats.forEach(stat => {
      html += `<li><strong>${stat}:</strong> ${match[stat] ?? "N/A"}</li>`;
    });
    html += `</ul>`;
    resultDiv.innerHTML = html;
  } else {
    resultDiv.innerHTML = `<p>No match found.</p>`;
  }
}
