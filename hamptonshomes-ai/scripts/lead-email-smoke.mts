import assert from "node:assert/strict";
import { applyPopupInterest, leadNotification } from "../src/lib/leads.ts";

const receivedAt = new Date("2026-10-19T15:00:00Z");

const followed = applyPopupInterest("popup", "Following the market", "Email popup");
assert.deepEqual(followed.detail, ["Interested in", "Following the market"]);
assert.equal(followed.form, "Email popup · Following the market");

const followedMail = leadNotification(
  {
    form: followed.form,
    name: "",
    email: "ada@example.com",
    phone: "",
    message: "",
    pageUrl: "https://hamptonshomes.ai/",
    details: followed.detail ? [followed.detail] : [],
  },
  { receivedAt }
);
assert.match(followedMail.subject, /Email popup · Following the market: ada@example.com/);
assert.match(followedMail.html, /Interested in/);
assert.match(followedMail.html, /Following the market/);

for (const interest of ["Buying", "Selling"]) {
  const applied = applyPopupInterest("popup", interest, "Email popup");
  const mail = leadNotification(
    {
      form: applied.form,
      name: "Ada",
      email: "ada@example.com",
      phone: "",
      message: "",
      pageUrl: "",
      details: applied.detail ? [applied.detail] : [],
    },
    { receivedAt }
  );
  assert.equal(applied.detail?.[0], "Interested in");
  assert.equal(applied.detail?.[1], interest);
  assert.match(mail.html, new RegExp(`Interested in[\\s\\S]*${interest}`));
}

const blank = applyPopupInterest("popup", "", "Email popup");
assert.equal(blank.form, "Email popup");
assert.equal(blank.detail, undefined);
const blankMail = leadNotification(
  { form: blank.form, name: "Ada", email: "ada@example.com", phone: "", message: "", pageUrl: "" },
  { receivedAt }
);
assert.doesNotMatch(blankMail.html, /Interested in/);
assert.match(blankMail.subject, /^Email popup: Ada$/);

const listing = applyPopupInterest("listing", "Following the market", "Listing inquiry");
assert.equal(listing.form, "Listing inquiry");
assert.equal(listing.detail, undefined);

const legacy = applyPopupInterest("signup", "Just the brief", "Market brief");
assert.equal(legacy.form, "Market brief");
assert.deepEqual(legacy.detail, ["Interested in", "Just the brief"]);

const unknown = applyPopupInterest("popup", "Something else", "Email popup");
assert.equal(unknown.form, "Email popup");
assert.equal(unknown.detail, undefined);

console.log("lead email smoke ok");
