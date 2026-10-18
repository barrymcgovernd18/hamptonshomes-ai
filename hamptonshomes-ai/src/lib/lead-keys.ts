/** Browser storage keys shared by the lead forms, the email popup and the reader slide-in. */
/** Set in sessionStorage when any lead form is submitted: the reader slide-in stays hidden for the rest of that session. */
export const LEAD_SESSION_KEY = "hh-lead-session";
/** Set when the market-report popup has been shown. Hides it on later pages in the same session. */
export const POPUP_SHOWN_SESSION_KEY = "hh-popup-shown";
/** Set only after the popup email is accepted. Hides the popup on future visits. Not one of the retired keys below. */
export const POPUP_SUBSCRIBED_KEY = "hh-popup-subscribed";
/** Retired 30-day localStorage keys. Cleared on load so they cannot suppress the popup. */
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

export function markPopupShown() {
  try {
    sessionStorage.setItem(POPUP_SHOWN_SESSION_KEY, "1");
  } catch {}
}

export function popupShownThisSession() {
  try {
    return sessionStorage.getItem(POPUP_SHOWN_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function markPopupSubscribed() {
  try {
    localStorage.setItem(POPUP_SUBSCRIBED_KEY, "1");
  } catch {}
}

export function popupSubscribed() {
  try {
    return localStorage.getItem(POPUP_SUBSCRIBED_KEY) === "1";
  } catch {
    return false;
  }
}
