const savedData = localStorage.getItem("securityReportData");
const reportData = savedData ? JSON.parse(savedData) : null;

function buildTableRows(pros, cons) {
    const maxRows = Math.max(pros.length, cons.length);
    let rowsHtml = "";
    for (let i = 0; i < maxRows; i++) {
        const proText = pros[i] || "";
        const conText = cons[i] || "";
        rowsHtml += `<tr><td>${proText}</td><td>${conText}</td></tr>`;
    }
    return rowsHtml;
}

function buildFootprintSection() {
    const chartBox = document.getElementById("footprintChart");
    const tableBody = document.getElementById("footprintTableBody");
    const conclusionBox = document.getElementById("footprintConclusion");

    if (!reportData.footprintScanned) {
        chartBox.innerHTML = `<div class="bar-row"><span class="bar-label">Not scanned</span></div>`;
        tableBody.innerHTML = buildTableRows([], ["You haven't scanned your digital footprint yet."]);
        conclusionBox.textContent = "Run a scan on the checkup page to see your public exposure here.";
        return;
    }

    chartBox.innerHTML = `
    <div class="bar-row">
      <span class="bar-label">Scan completed</span>
      <div class="bar-track"><div class="bar-fill" style="width:100%; background:#58a6ff;"></div></div>
    </div>
  `;

    const pros = ["You checked your digital footprint — good habit to repeat periodically."];
    const cons = [`Remember: usernames are unique per platform, so any "Found" result reflects exactly one real account.`];

    tableBody.innerHTML = buildTableRows(pros, cons);

    conclusionBox.textContent = "You've reviewed your public footprint. Re-check periodically, especially after creating new accounts.";
}

buildFootprintSection();