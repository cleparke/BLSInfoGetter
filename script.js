document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const searchInput = document.getElementById("search");
  const resultsDiv = document.getElementById("results");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent page reload

    resultsDiv.textContent = "Loading...";

    const rawBody = JSON.stringify({
      areaTypeCode: "N",
      areaCode: "0000000",
      industryCode: "000000",
      occupationCode: ["xxxxxx"],
      datatype: ["xxxxxx"],
      releaseDateCode: ["2024A01", "2024A01"],
      outputType: "H"
    });

    try {
      const response = await fetch("https://data.bls.gov/OESServices/resultsindocc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: rawBody
      });

      if (!response.ok) {
        resultsDiv.textContent = `Error: ${response.status} ${response.statusText}`;
        return;
      }

      const data = await response.json();
      resultsDiv.textContent = JSON.stringify(data, null, 2);

    } catch (error) {
      resultsDiv.textContent = `Fetch failed: ${error.message}`;
    }
  });
});
