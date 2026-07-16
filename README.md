# Personal Security Checkup

A beginner-built web app to check your personal security hygiene — password strength, data breach exposure, and digital footprint — built as a hands-on learning project (no prior coding experience going in).

## Project Roadmap

- Phase 1: Password Strength Checker
- Phase 2: Breach Checker
- Phase 3: Digital Footprint Scanner
- Phase 4: Combined Security Report Card

---

## Phase 1: Password Strength Checker (Complete)

Live-scores a typed password out of 7 possible points, based on:
- Length >= 8 characters (+1)
- Length >= 12 characters (+1)
- Contains lowercase letter (+1)
- Contains uppercase letter (+1)
- Contains a digit (+1)
- Contains a special character (+1)
- No 3+ repeated characters in a row (+1)

**Extra rules:**
- Passwords under 4 characters automatically score 0
- Max length capped at 64 characters (per NIST SP 800-63B guidelines)
- Checked against a list of common/leaked passwords (e.g. "password123") — flagged as "Very Weak" regardless of score if matched

**UI features:**
- Live color-coded strength bar (red/orange/green)
- Show/hide password toggle (eye icon), which:
  - Only appears once typing starts
  - Auto-hides again if you resume typing after revealing it (security/privacy touch)

**Tech used:** HTML, CSS, vanilla JavaScript (no frameworks/libraries) — all in a single `index.html` file.

---

## Phase 2: Breach Checker (In Progress)

Checks whether a typed password has appeared in known public data breaches, using the Have I Been Pwned (HIBP) Pwned Passwords API.

**Key technique: k-anonymity**
To avoid ever sending your actual password (or even its full hash) over the internet:
1. The password is hashed locally using SHA-1 (via the browser's built-in Web Crypto API)
2. Only the first 5 characters of that hash are sent to HIBP
3. HIBP returns all leaked hashes sharing that same 5-character prefix (often hundreds of results)
4. The full comparison happens locally in the browser — HIBP never sees your real password or full hash

**Why SHA-1 despite being cryptographically broken elsewhere:** SHA-1 is no longer considered secure for things like digital signatures, since collisions can be deliberately engineered. However, HIBP's entire breach database is built using SHA-1 fingerprints, so it's used here purely as a fixed-format lookup key, not as a security guarantee — a fitting use case despite its known weaknesses elsewhere.

**UI features:**
- "Check for Breaches" button appears (with a subtle pulse animation) once a password is typed
- Clicking it shows a styled in-page message: red for breached (with exact breach count), green for not found
- Result message clears automatically if the password field is emptied

---

## Phase 3: Digital Footprint Scanner (Complete)

Checks how discoverable a username is across the internet — a beginner introduction to OSINT (Open-Source Intelligence), the practice of gathering publicly available information, relevant here because attackers often research a target's usernames before an attack.

**Two-part honest approach:**
Most social platforms (Instagram, Twitter/X, LinkedIn, TikTok) block automated lookups via a browser security rule called CORS (Cross-Origin Resource Sharing) — they deliberately don't allow outside websites to query them directly. Rather than faking this or scraping unreliably, this project splits footprint checking into two categories:

1. **Automatic check (GitHub only)** — GitHub provides a genuine public API (`api.github.com/users/{username}`) that explicitly allows browser-based queries. A live "Found" / "No exact match found" result is generated automatically by checking the HTTP status code returned (200 = exists, 404 = doesn't).
2. **Manual-check links (Instagram, Twitter/X, Reddit, LinkedIn)** — since these platforms can't be queried automatically, clicking a "Check manually →" link opens that platform's profile URL for the given username in a new tab, so the user can visually verify themselves.

**UI features:**
- Scan button positioned inside the username input field
- "Checking..." loading state shown while the GitHub request is in progress
- Results clear automatically when the username field is emptied

**Tech used:** `fetch` for the GitHub API call, HTTP status code checking, JavaScript arrays of objects + `.forEach()` looping to generate platform rows dynamically.

---

## Project Structure

The project is split into three files for maintainability:
- `index.html` — page structure only
- `style.css` — all styling
- `script.js` — all logic

---

## Tools Used
- VS Code — code editor
- Git & GitHub — version control and hosting
- Browser (Chrome/Edge) — runs the app directly, no server needed