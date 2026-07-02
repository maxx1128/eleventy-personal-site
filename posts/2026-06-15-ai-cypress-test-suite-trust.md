---
title: "Holding the Nozzle: Scaling a Cypress Suite With AI Without Getting Blasted"
date: "2026-06-15"
excerpt: "AI supercharged a Cypress test suite—right up until it started cheerfully validating the very bugs it was supposed to catch. Here's how I kept it on a leash."
---
There's a genre of blog post I've grown allergic to: the one where someone points an AI at a codebase, watches it spit out something plausible, and declares that engineering as a discipline is officially over. It's a great story.

It's also, in my experience, {% footnoteref "fiction" "Not the good type of fiction, either. Don't expect AI to write the next Throne of Glass series." %}complete fiction.{% endfootnoteref %}

Here's the less glamorous truth. Over about two months, working solo, I did some major refactoring on a Cypress test suite, repairing existing tests and adding many new ones. By the end, coverage had grown by over 300% and the pass rate had climbed from 35% to north of 90%. AI was involved in nearly every step. **The single most important AI skill wasn't prompting or clarifying — it was knowing when to tell the AI (politely) that it was wrong.**

Think of AI here less like a senior engineer and more like a firehose. Enormous throughput, genuinely useful, and absolutely capable of blasting you across the room if you let go of the nozzle. This post is about how I kept hold of that nozzle.

## The Starting Line

The suite wasn't broken by some dramatic catastrophe; it was just under-maintained in several ways. There were tests that had quietly drifted out of sync with the product, accumulated flakiness, and far too much red in the CI dashboard to take seriously.

That last part is the real danger. A test suite that cries wolf with a pass rate below 50% isn't just unhelpful. It actively erodes release confidence, because nobody can tell a real failure from the usual noise.

The job, then, was two-pronged: **stabilize** what existed (kill the flakiness, fix the false failures) and **expand** coverage across the critical user flows we were flying blind on (such as smoke tests and financial payments). One engineer, one backlog of cranky tests, roughly one to two months, and a set of AI tools.

## Where AI Actually Earned Its Keep

Let me be clear before the cautionary section: **the acceleration was real.** AI is genuinely excellent at the parts of testing work that are high-volume and pattern-heavy — the stuff that used to eat afternoons.

### Generating Fixture Data at Speed

Hand-writing realistic JSON fixtures is the kind of tedious that {% footnoteref "career" "But not enough to be an accountant. Let's not get crazy." %}makes me question my career choices.{% endfootnoteref %} AI scaffolded these in seconds, giving me plausible shapes for API responses based on past data so I could stub against them instead of hitting real services.

```javascript
// Pseudo-code: stubbing an API response against an AI-generated fixture
// so tests run against predictable data instead of a live service.
cy.intercept('POST', '/api/checkout', {
  statusCode: 200,
  fixture: 'checkout/successful-charge.json', // AI-scaffolded shape
}).as('checkout')

cy.get('[data-test="pay-button"]').click()
cy.wait('@checkout')
cy.get('[data-test="receipt"]').should('be.visible')
```

This alone reclaimed hours per week, freeing me to spend energy on the tests' actual logic rather than their plumbing.

### Brainstorming Refactoring Approaches

Used as a thinking partner, AI is a fast way to surface options I might not have reached for. I'd describe a gnarly, tightly-coupled spec and ask for restructuring ideas, then cherry-pick the good ones.

The value wasn't the AI being right; it was the AI being *fast at generating candidates* I could then judge with actual experience. Most of the time it generated at least one or two good ideas. If not, at least I could see how to tweak my ask and get better ideas a second time.

### Large-Scale File Refactoring to Eliminate Test Overlap

This was the big lever behind the coverage growth. A lot of the suite's flakiness came from tests stepping on each other — redundant setup, shared state, overlapping assertions that made failures impossible to localize.

AI was invaluable for the mechanical heavy lifting of reorganizing dozens of files into clean, isolated units, which is exactly the kind of repetitive-but-careful work that's miserable to do by hand.

The pattern I leaned on most: pull the shared, order-dependent setup out of a sprawling file and give each spec its own self-contained state, so a failure points at one flow instead of five.

```javascript
// Pseudo-code: BEFORE — specs share mutable state and run order matters.
// One flaky login silently drags down the specs stacked behind it.
describe('account flows', () => {
  before(() => cy.loginViaUi('shared-user')) // set once, reused everywhere
  it('updates the profile', () => { /* depends on prior state */ })
  it('changes the password', () => { /* depends on prior state */ })
  it('deletes the account', () => { /* nukes state for everyone after */ })
})

// AFTER — each spec owns its setup via a fixture-backed session.
// Isolated, order-independent, and a failure localizes to one flow.
describe('profile update', () => {
  beforeEach(() => cy.seedUser({ fixture: 'users/active-account.json' }))
  it('updates the profile', () => { /* self-contained */ })
})
```

The broader issue of leaking test states was also fixed much faster with AI. It quickly isolated all the cases where the leaks occurred, which let me examine each one for exceptions before having the fixes implemented in batches. The same amount of work got done in about half the time.

## Where AI Tried to Lead Me Astray

Here's the part the hype posts skip. Every one of those accelerations came with a failure on the other side of the coin. If I'd trusted the output blindly, I'd have shipped a suite that looked green and provided no value.

### Hallucinated Data That Passed the Type Check but Failed Reality

The generated fixtures almost always matched the correct *data type* — strings where strings belonged, numbers where numbers did, etc. The problem was semantic: a value would be internally plausible but the result was illogical or flatly contradicted a user story. It could be a price that didn't match the line items, or a status no real workflow could produce.

The AI doesn't have access to my product's intent or the common user flows, so it can't know the data is nonsense. What saved me was UI/UX instinct I hadn't actively used in about a decade. That's the ability to look at a rendered screen and go "a real user would never see this."

```javascript
// Pseudo-code: the fixture is type-perfect but semantically impossible.
// Every field is the right type; the data still tells a story no real user could.
{
  "orderId": "ord_10432",
  "status": "delivered",        // ...for an order with no shipment
  "items": [],                  // delivered, but nothing was actually bought
  "subtotal": 0.00,
  "total": 149.99               // a total conjured from an empty cart
}
```

Often the mistake wouldn’t seem that important. But one thing I’ve learned while testing: even the smallest inconsistency can come back to bite you later. These can affect user actions, page validation, and even stubbed API responses. Even if it’s small, it was best to fix them whenever I spotted them.

**The bigger lesson: generated fixtures are drafts.** I validate them against the actual experience, not just the schema.

### False Confidence, Then a Tell

The AI loved to declare victory on the first pass. Most of the time a couple of correction rounds sorted it out, and it “acknowledged” it had been wrong. But this only worked as long as I was able to catch the mistake in the first place, which was never a guarantee.

The more useful signal came in the big, stubborn cases: when the AI kept confidently getting it wrong after nearly a dozen attempts. **That was never a sign to keep prompting — it was a sign that *I* had misdiagnosed the bug.** If I didn’t go back to the drawing board, it would be an infinite loop of “I found the error at last” and “sorry, let me check that again.”

The repeated failure was information. Learning to read it as "my premise is wrong" instead of "the AI just needs one more try" was one of the highest-leverage habits I built. In a way it was like a human — the more recklessly self-assured it was, {% footnoteref "skepticism" "And the more I knew to never join their Herbalife independent distributer network." %}the more caution and healthy skepticism I gave it.{% endfootnoteref %}

### The Yes-Man Problem (the Big One)

This is the failure mode I'd tattoo on every AI user's monitor. **The AI has a strong bias toward *agreeing with and validating my suspicions*** rather than independently checking whether something else was the cause. If I said "I think the bug is in the login handler," it would enthusiastically find reasons the login handler was guilty — even when the real culprit was elsewhere.

Worse, it would sometimes assume the existing test's intent was correct and cheerfully write assertions confirming *wrong* behavior as if it were the spec.

```javascript
// Pseudo-code: the trap. The AI "fixed" the test to pass...
// by asserting the buggy behavior as if it were correct.
// BEFORE (AI-"fixed", wrong intent):
cy.get('[data-test="cart-total"]').should('contain', '$0.00') // ??? user added 3 items

// AFTER (human-corrected, real intent):
cy.get('[data-test="cart-total"]').should('contain', '$74.97') // matches the user story
```

This is the core tradeoff of using AI to investigate or brainstorm: **it may see or invent exactly what it thinks I want to see.** An investigator that only ever confirms my first theory isn't an investigator, {% footnoteref "parrot" "It's not even one of the fun parrots that learn curse words." %}it’s a parrot.{% endfootnoteref %}

## The Leash: How I Managed It

The difference between AI helping and AI quietly sabotaging me came down to process — and, it also turned out, tool choice.

### I Switched from Copilot to Claude

I started on Copilot, then moved to Claude after comparing notes with other tech leads. The consensus, which matched my own experience, was that Claude was more analytical and thorough and assumed it was right less often.

Concretely, Copilot was much more prone to *biasing itself around my suspicions* — telling me what I'd hinted I wanted to hear. Claude was more likely to push back with something like "I checked, and this may actually be the problem." It was slower, but for investigative work where confirmation bias is the enemy, a tool that occasionally disagrees with me or admits “I’m not sure” is worth the extra minutes.

### Review Your Own PRs as if They Were a Stranger's

Before marking anything ready for review, I read my own diffs with the cold suspicion I'd bring to a colleague's work. This one habit catches an astonishing number of "wait, why did the AI do *that*" moments that self-satisfaction would otherwise wave through.

There were times when code created with AI-assistance slipped through the cracks. Most of the time it was benign. But there were one or two times where it *may* have triggered massive regressions after the code slipped through several code reviews. The AI didn’t know it was causing these issues, but as engineers, we should have.

### Force Explicitness Before Any Change

I learned to instruct the AI to make no edits until it had spelled out, precisely, which changes it intended to make. This turns a black-box "trust me" edit into a reviewable plan, and it catches wrong-headed changes before they ever touch a file.

Several Claude skills are now out that are better at this, such as the [Brainstorming skill,](https://mcpmarket.com/tools/skills/brainstorming-planning) with this type of behavior built in. My coworkers and I adopted it right away and never looked back.

### Run Everything Locally and Verify First

No change graduated to a pull request until I'd run it locally and watched it behave correctly with my own eyes. Green in isolation means nothing if I haven't confirmed it's green for the *right reason*. This included both manual and automated tests, in what I changed directly and anything that may have been indirectly changed.

## The Takeaway (for Engineers and the People Who Manage Them)

If you take one thing from this, make it this: **AI owns the volume, humans own the correctness and the intent.** The suite grew so much and got stabilized because AI absorbed the tedious throughput while I stayed firmly responsible for whether any of it was the right call or actually *true*.

For engineers, the durable skill isn't prompting — it's judgment. It’s knowing when repeated failure means your premise is wrong, and being willing to disagree with a very confident machine. For leads and managers, the implication is bigger: AI makes your people faster, but it also quietly rewards the ones with strong fundamentals and punishes the ones who outsource their thinking.

The right move isn't "give everything to AI" or "forever ban AI." It's building a culture where verification, explicit change plans, and honest self-review are non-negotiable. Where AI isn’t seen as letting us do less work, but as shifting more of our work toward decisions about architecture, reliability, and business value. That's the difference between an AI-accelerated suite that *looks* trustworthy and one that actually is.

The firehose is powerful. Just never, ever let go of the nozzle.