const input = document.getElementById("passwordInput");
const bar = document.getElementById("strengthBar");
const text = document.getElementById("strengthText");
const toggle = document.getElementById("toggleVisibility");
const eyeIcon = document.getElementById("eyeIcon");

let currentPasswordScore = null;     //we use let so the variables can change 
let currentBreachCount = null;
let footprintScanned = false;

toggle.addEventListener("click", () => {
  if (input.type === "password") {
    input.type = "text";
    eyeIcon.innerHTML = `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>`;
  } else {
    input.type = "password";
    eyeIcon.innerHTML = `<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
  }
});

input.addEventListener("input", () => {
  const password = input.value;

  if (input.type === "text") {
    input.type = "password";
    eyeIcon.innerHTML = `<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line>`;
  }

  document.getElementById("breachButton").style.display = password.length === 0 ? "none" : "inline-block";

  toggle.style.display = password.length === 0 ? "none" : "block";
  if (password.length === 0) {
    bar.style.width = "0%";
    text.textContent = "";
    currentPasswordScore = null;
    document.getElementById("breachResult").className = "";
    document.getElementById("breachResult").style.display = "";
    document.getElementById("reportCard").innerHTML = "";
  } else if (isCommonPassword(password)) {
    bar.style.width = "100%";
    bar.style.background = "red";
    text.textContent = "Very weak - Common Password!";
  } else {
    const score = checkStrength(password);
    currentPasswordScore = score;
    updateDisplay(score);
  }
});

document.getElementById("usernameInput").addEventListener("input", () => {
  const username = document.getElementById("usernameInput").value.trim();
  if (username === "") {
    document.getElementById("footprintResults").innerHTML = "";
    footprintScanned = false; 
    document.getElementById("reportCard").innerHTML = "";
  }
});

function checkStrength(password) {
  let score = 0;
  if (password.length < 4) score = 0;
  else {
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (!/(.)\1\1/.test(password)) score++;
  }
  return score;
}

const commonPasswords = [
  "password", "password123", "123456", "123456789", "qwerty",
  "abc123", "letmein", "monkey", "111111", "iloveyou", "000000",
  "admin", "welcome", "qwerty123", "password1", "12345678"
];

function isCommonPassword(password) {
  return commonPasswords.includes(password.toLowerCase());
}

function updateDisplay(score) {
  const percent = (score / 7) * 100;
  bar.style.width = percent + "%";

  if (score <= 2) {
    bar.style.background = "red";
    text.textContent = "Weak";
  } else if (score <= 4) {
    bar.style.background = "orange";
    text.textContent = "Moderate";
  } else {
    bar.style.background = "limegreen";
    text.textContent = "Strong";
  }
}

// function generateReport() {                                 //generated report in grade format and that too on the same page 
//   const reportBox = document.getElementById("reportCard");

//   if (currentPasswordScore === null) {
//     reportBox.innerHTML = `<div class="grade-note">Enter a password above before generating a report.</div>`;
//     return;
//   }

//   let totalPoints = currentPasswordScore;
//   let maxPoints = 7;

//   if (currentBreachCount !== null) {
//     maxPoints += 3;
//     if (currentBreachCount === 0) {
//       totalPoints += 3;
//     }
//   }

//   const percent = (totalPoints / maxPoints) * 100;

//   let grade;
//   let color;
//   if (percent >= 90) { grade = "A+"; color = "#56d364"; }
//   else if (percent >= 80) { grade = "A"; color = "#56d364"; }
//   else if (percent >= 70) { grade = "B"; color = "#e3b341"; }
//   else if (percent >= 55) { grade = "C"; color = "#e3b341"; }
//   else if (percent >= 40) { grade = "D"; color = "#ff7b72"; }
//   else { grade = "F"; color = "#ff7b72"; }

//   let summary = `Password strength: ${currentPasswordScore}/7`;
//   if (currentBreachCount !== null) {
//     summary += currentBreachCount > 0
//       ? ` — Breached (${currentBreachCount.toLocaleString()} times)`
//       : ` — Not found in known breaches`;
//   } else {
//     summary += ` — Breach status not checked`;
//   }

//   let note = currentBreachCount === null
//     ? "Click \"Check for Breaches\" for a more complete score."
//     : "";

//   if (!footprintScanned) {
//     note += (note ? " " : "") + "Digital footprint not scanned — run a scan above to check your exposure separately.";
//   }

//   reportBox.innerHTML = `
//     <div class="grade-box">
//       <div class="grade-letter" style="color:${color};">${grade}</div>
//       <div class="grade-summary">${summary}</div>
//       ${note ? `<div class="grade-note">${note}</div>` : ""}
//     </div>
//   `;
// }

document.getElementById("reportButton").addEventListener("click", () => {
  const reportData = {
    passwordScore: currentPasswordScore,
    breachCount: currentBreachCount,
    footprintScanned: footprintScanned
  };
  localStorage.setItem("securityReportData", JSON.stringify(reportData));
  window.location.href = "report/report.html";
});

async function sha1Hash(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex.toUpperCase();
}

async function checkBreach(password) {
  const hash = await sha1Hash(password);
  const prefix = hash.slice(0, 5);
  const suffix = hash.slice(5);

  const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
  const text = await response.text();

  const lines = text.split("\n");
  for (const line of lines) {
    const [hashSuffix, count] = line.split(":");
    if (hashSuffix === suffix) {
      return parseInt(count);
    }
  }
  return 0;
}

async function checkGitHub(username) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    return response.status === 200;
  } catch (error) {
    return null;
  }
}

const manualCheckPlatforms = [
  { name: "Instagram", url: "https://instagram.com/" },
  { name: "Twitter / X", url: "https://x.com/" },
  { name: "Reddit", url: "https://reddit.com/user/" },
  { name: "LinkedIn", url: "https://linkedin.com/in/" }
];

function createManualCheckRow(platform, username) {
  const row = document.createElement("div");
  row.className = "platform-row";
  row.innerHTML = `<span>${platform.name}</span><a href="${platform.url}${username}" target="_blank" style="color:#58a6ff;">Check manually →</a>`;
  return row;
}

document.getElementById("breachButton").addEventListener("click", async () => {
  const password = input.value;
  const count = await checkBreach(password);
  currentBreachCount = count;
  const resultBox = document.getElementById("breachResult");

  if (count > 0) {
    resultBox.className = "breached";
    resultBox.textContent = `⚠ This password has appeared in ${count.toLocaleString()} known data breaches.`;
  } else {
    resultBox.className = "safe";
    resultBox.textContent = "✓ Good news — this password was not found in any known breaches.";
  }
});

document.getElementById("scanButton").addEventListener("click", async () => {
  const username = document.getElementById("usernameInput").value.trim();
  const resultsBox = document.getElementById("footprintResults");
  resultsBox.innerHTML = "";

  if (username === "") {
    return;
  }
  footprintScanned = true;
  resultsBox.innerHTML = '<div class="platform-row"><span>Checking...</span></div>';

  const githubExists = await checkGitHub(username);

  resultsBox.innerHTML = "";

  const githubRow = document.createElement("div");
  githubRow.className = "platform-row";

  if (githubExists === true) {
    githubRow.innerHTML = `<span>GitHub</span><span style="color:#ff7b72;">Found</span>`;
  } else if (githubExists === false) {
    githubRow.innerHTML = `<span>GitHub</span><span style="color:#56d364;">No exact match found</span>`;
  } else {
    githubRow.innerHTML = `<span>GitHub</span><span style="color:#8b949e;">Couldn't check</span>`;
  }

  resultsBox.appendChild(githubRow);

  manualCheckPlatforms.forEach(platform => {
    const row = createManualCheckRow(platform, username);
    resultsBox.appendChild(row);
  });
});