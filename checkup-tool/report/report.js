const savedData = localStorage.getItem("securityReportData");
const reportData = savedData ? JSON.parse(savedData) : null;

function buildFootprintSection() {
  const chartBox = document.getElementById("footprintChart");
  const prosBox = document.getElementById("footprintPros");
  const consBox = document.getElementById("footprintCons");
  const conclusionBox = document.getElementById("footprintConclusion");

  if (!reportData.footprintScanned) {
    chartBox.innerHTML = `<div class="bar-row"><span class="bar-label">Not scanned</span></div>`;
    prosBox.innerHTML = "";
    consBox.innerHTML = `<li>You haven't scanned your digital footprint yet.</li>`;
    conclusionBox.textContent = "Run a scan on the checkup page to see your public exposure here.";
    return;
  }

  chartBox.innerHTML = `
    <div class="bar-row">
      <span class="bar-label">Scan completed</span>
      <div class="bar-track"><div class="bar-fill" style="width:100%; background:#58a6ff;"></div></div>
    </div>
  `;

  prosBox.innerHTML = `<li>You checked your digital footprint — good habit to repeat periodically.</li>`;
  consBox.innerHTML = `<li>Remember: usernames are unique per platform, so any "Found" result reflects exactly one real account.</li>`;

  conclusionBox.textContent = "You've reviewed your public footprint. Re-check periodically, especially after creating new accounts.";
}

buildFootprintSection();