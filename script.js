document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const resultsDiv = document.getElementById("results");

  searchInput.addEventListener("input", async () => {
    const query = searchInput.value.trim();

    if (query.length < 2) {
      resultsDiv.textContent = "";
      return;
    }

    // Prepare the POST body with your query replacing "xxxxxx"
    const requestBody = {
      areaTypeCode: "N",
      areaCode: "0000000",
      industryCode: "000000",
      occupationCode: [query],
      datatype: [query],
      releaseDateCode: ["2024A01", "2024A01"],
      outputType: "H"
    };

    resultsDiv.textContent = "Loading...";

    try {
      const response = await fetch("https://data.bls.gov/OESServices/resultsindocc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        resultsDiv.textContent = `Error: ${response.status} ${response.statusText}`;
        return;
      }

      const data = await response.json();
      // Just dump the raw JSON for now
      resultsDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      resultsDiv.textContent = `Fetch failed: ${error.message}`;
    }
  });
});
