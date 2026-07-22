# Elyse's feedback — annotated screenshots (Jul 20–21, 2026)

Elyse marked up the live site (emmanueladusi.github.io) on her iPad. Each item below
transcribes one annotated screenshot: which page, which section, what she wrote, and
what to change. Work through them top to bottom.

The screenshot images are saved in `feedback/screenshots/`, numbered to match the
items below (e.g. item 1 = `01-home-about-elyse.jpeg`). Open each image to see
exactly what Elyse circled/pointed at before making the change.

---

## 1. Home (`index.html`) — "About Elyse" section

**Section:** `06 — MEET THE RESEARCHER` / "About Elyse."
**Annotation (blue ink, arrow pointing at the heading):** "move to top of page" and
"add my testimony first"

**Changes:**
- Move the entire About Elyse section to the top of the home page (it's currently
  section 06, near the bottom).
- Add Elyse's personal testimony as the first thing in that section, before the
  current bio copy ("Hi, I'm Elyse Fisher-Uriarte…"). Her testimony about living with
  endometriosis should lead; ask her for the exact testimony text if it isn't already
  on the site (the Stories page may have it).

## 2. Home (`index.html`) — "What You'll Find" section

**Section:** `04 — WHAT YOU'LL FIND` / heading "Everything we wished we'd had."
**Annotation (blue ink, arrow at the heading):** "Change the name, what we have."

**Change:**
- Rename the heading from "Everything we wished we'd had." to "What we have." (keep
  the same style/punctuation conventions as the other section headings).

## 3. Parents page (`parents.html`) — hero filter tags

**Section:** Hero "Supporting someone *you love.*" with the three pill tags:
"For parents", "Partners & friends", "Siblings". Blue line drawn under the tags.
**Annotation (blue ink):** "add together — Parents + family"

**Change:**
- Merge the "For parents" and "Siblings" groupings into one combined
  "Parents + family" tag/section. See item 4 — same request from the section side.

## 4. Parents page (`parents.html`) — "Siblings" section

**Section:** `03 — Siblings.` (with the "How to support a sibling" checklist)
**Annotation (black ink, arrow at the heading):** "Add to the top with parents and
family"

**Change:**
- Move the Siblings content up and merge it into the parents section so there is one
  combined "Parents + family" section at the top of the page (matching item 3). The
  sibling checklist content stays, it just lives inside the combined section instead
  of being its own section 03 at the bottom.
- Update the sticky sub-nav (For / How to Support / When to Seek Help / Talking About
  Periods / Doctors…) to match the new structure.

## 5. Parents page (`parents.html`) — card pop-up behaviour

**Section:** "…& friends." section, the grid of cards ("Helpful things to say",
"…things to say", etc.). Arrow drawn from annotation to the cards.
**Annotation (blue ink):** "when you click, let a little window pop up so they can
read, if they click out, go back to normal view"

**Change:**
- Make each card in this section clickable. On click, open a small modal/pop-up with
  the card's full content so it's easier to read. Clicking outside the modal (or an X)
  closes it and returns to the normal page view. Should work well on iPad/touch.

## 6. Resources page (`resources.html`) — remove Planned Parenthood

**Section:** External resources card grid (Nemours KidsHealth, Office on Women's
Health, SexAndU.ca, Planned Parenthood, Endometriosis Foundation of America, ACOG).
**Annotation (black ink, arrow pointing at the Planned Parenthood card):** "take away
this one"

**Change:**
- Delete the Planned Parenthood card from the resources grid. Keep the other five.
  Fix the grid layout if the odd count leaves a gap.

## 7. Learn page (`learn.html`) — Myth vs. fact game

**Section:** `01 — Myth vs. fact.` (8-question tap game)
**Annotation (black ink):** "make 3 choices in what you play — easy, medium, hard
levels + % at end as well"

**Changes:**
- Add a difficulty picker before the game starts: Easy / Medium / Hard, each with its
  own question set (or increasingly tricky statements).
- At the end of a round, show a score as a percentage (e.g. "You got 6/8 — 75%").

## 8. Learn page (`learn.html`) — move the Symptom awareness checklist

**Section:** `02 — Symptom awareness checklist.`
**Annotation (blue ink):** "move this to the bottom of the learn page"

**Change:**
- Move the Symptom awareness checklist section to the bottom of the Learn page (last
  section). Renumber the remaining sections so the 01/02/03 labels stay in order.

## 9. Learn page (`learn.html`) — polls should be votable

**Section:** The survey-results poll cards ("Before today, had you heard of
endometriosis?", "Should schools teach more about reproductive health?", "How
comfortable would you feel talking to a teacher or provider about severe period
pain?").
**Annotation (blue + black ink, arrow at the comfort poll):** "make it so you can vote
here as well"

**Changes:**
- Every poll on the page should be votable — the comfort-level poll is missing its
  Vote buttons; add them so it works like the other two.
- Bug visible in the screenshot: "Not comfortable at all" shows **NaN%**. Fix the
  percentage math so every option renders a real number and the options sum sensibly.

## 10. Learn page (`learn.html`) — Match the symptom game

**Section:** "Match the symptom." (symptoms ↔ conditions matching game)
**Annotation (black ink):** "Show answers once all is completed, whether right or
wrong. Then explain why right or wrong"

**Changes:**
- Change the game so the player's matches are NOT judged one at a time. Let them match
  everything, and only after all pairs are placed, reveal which were right and which
  were wrong.
- For each pairing, show a short explanation of why the match is correct (or why the
  player's choice was wrong and what the right answer is).
- Also visible in the screenshot: the condition list says **"PMOS" — that should be
  "PCOS"** (polycystic ovary syndrome). Fix the typo.

---

## Notes for whoever implements this

- Site copy rule: no em dashes in on-site copy.
- Audience includes minors — keep all content and any new modal/game copy
  age-appropriate and non-diagnostic ("worth a conversation, not a diagnosis" tone).
- Test on iPad-size viewports; Elyse uses the site on an iPad, and the Quick exit
  button must stay reachable.
- Deploy flow is a subtree force-push to GitHub Pages root; commit any new/untracked
  JS files first.
