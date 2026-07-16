const savedData = localStorage.getItem("securityReportData");
const reportData = savedData ? JSON.parse(savedData) : null;

function buildTableRows(pros, cons) {
    const prosList = pros.map(p => `<li>${p}</li>`).join("");
    const consList = cons.map(c => `<li>${c}</li>`).join("");
    return `<tr><td><ul class="cell-list">${prosList}</ul></td><td><ul class="cell-list">${consList}</ul></td></tr>`;
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

function buildPasswordSection() {
    const chartBox = document.getElementById("passwordChart");
    const tableBody = document.getElementById("passwordTableBody");
    const conclusionBox = document.getElementById("passwordConclusion");

    if (reportData.passwordScore === null) {
        chartBox.innerHTML = `<div class="bar-row"><span class="bar-label">Not checked</span></div>`;
        tableBody.innerHTML = buildTableRows([], ["No password was entered."]);
        conclusionBox.textContent = "Enter a password on the checkup page to see your strength breakdown here.";
        return;
    }

    const percent = (reportData.passwordScore / 7) * 100;
    let barColor = "#ff7b72";
    if (percent > 70) barColor = "#56d364";
    else if (percent > 40) barColor = "#e3b341";

    chartBox.innerHTML = `
    <div class="bar-row">
      <span class="bar-label">Strength score</span>
      <div class="bar-track"><div class="bar-fill" style="width:${percent}%; background:${barColor};"></div></div>
      <span>${Math.round(percent)}%</span>
    </div>
  `;

    const pros = [];
    const cons = [];

    if (reportData.passwordScore >= 5) {
        pros.push("Good length and character variety.");
    } else {
        cons.push("Password could use more length and character variety (uppercase, numbers, symbols).");
    }

    if (reportData.breachCount === null) {
        cons.push("Breach status wasn't checked — click \"Check for Breaches\" on the checkup page for a fuller picture.");
    } else if (reportData.breachCount === 0) {
        pros.push("Not found in any known data breaches.");
    } else {
        cons.push(`Found in ${reportData.breachCount.toLocaleString()} known data breaches — strongly consider changing this password.`);
    }

    tableBody.innerHTML = buildTableRows(pros, cons);

    let conclusionText = "Your password has a reasonable foundation.";
    if (reportData.breachCount > 0) {
        conclusionText = "This password has been exposed in breaches — even if it scores well structurally, it should be changed.";
    } else if (reportData.passwordScore < 5) {
        conclusionText = "Consider strengthening this password with more length and varied characters.";
    }
    conclusionBox.textContent = conclusionText;
}

function buildOverallConclusion() {
    const box = document.getElementById("overallConclusion");

    const parts = [];

    if (reportData.passwordScore === null) {
        parts.push("no password was checked");
    } else if (reportData.breachCount > 0) {
        parts.push("your password was found in a data breach and should be changed");
    } else if (reportData.passwordScore >= 5) {
        parts.push("your password looks strong");
    } else {
        parts.push("your password could be stronger");
    }

    if (!reportData.footprintScanned) {
        parts.push("your digital footprint hasn't been scanned yet");
    } else {
        parts.push("you've reviewed your digital footprint");
    }

    box.textContent = "Overall: " + parts.join(", and ") + ".";
}

buildOverallConclusion();
buildFootprintSection();
buildPasswordSection();