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

**Tech used:** `fetch` API for network requests, `async/await` for handling asynchronous operations, Web Crypto API for hashing.

---

## Project Structure

As the project grew, it was split from a single `index.html` into three files for maintainability:
- `index.html` — page structure only
- `style.css` — all styling
- `script.js` — all logic

---

## Tools Used
- VS Code — code editor
- Git & GitHub — version control and hosting
- Browser (Chrome/Edge) — runs the app directly, no server needed