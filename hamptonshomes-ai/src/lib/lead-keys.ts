/** Browser storage keys shared by the lead forms, the email popup and the reader slide-in. */
/** Set in sessionStorage when any lead form is submitted: no popup or slide-in for the rest of that session. */
export const LEAD_SESSION_KEY = "hh-lead-session";
/** Retired 30-day localStorage keys, cleared on load so returning visitors see the popup again. */
export const RETIRED_KEYS = ["hh-lead-done", "hh-popup-seen"];

export function markLeadSubmitted() {
  try {
    sessionStorage.setItem(LEAD_SESSION_KEY, "1");
  } catch {}
}

export function leadThisSession() {
  try {
    return sessionStorage.getItem(LEAD_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
