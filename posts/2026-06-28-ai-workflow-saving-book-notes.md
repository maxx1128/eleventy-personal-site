---
title: 'My AI Workflow for Saving Book Notes'
date: '2026-06-28'
excerpt: 'My Kindle highlights were collecting digital dust — until I used Python, Claude, and some AI prompts to turn them into study guides.'
---

There’s something deeply satisfying about sinking into an intriguing nonfiction book. I love learning ideas and highlighting passages for entertainment and to become a better person. I love finishing these books feeling like I've absorbed something real.

And then, almost without fail, I love {% footnoteref "book-forgetting" "Or if I'm 'lucky,' 60% in eight months." %}forgetting 80% of it within six months.{% endfootnoteref %}

I know I'm not alone here. **The gap between *taking in* knowledge and *retaining* it is one of the most frustrating experiences I’ve had in the self-directed learning world.** I read the book, highlighted the good parts, and even thought of some ways I can use this knowledge in my life. Then when someone asks me six months later what I took away from it, all that knowledge has conveniently left my head. I mumble something about "there was a good chapter on estimation" and hope they don't ask more.

So I did what most programmers do. I ruminated for a while, {% footnoteref "angry-walk" "Loud techno music optional but highly recommended." %}took an angry walk to blow off some steam,{% endfootnoteref %} and then made something to help solve it. In this case, I built a pipeline that takes my Kindle highlights from raw markup to polished, study-guide-quality notes. The most important part: **AI is the bridge between "collecting notes" and "making readable and focused notes" with minimal work and friction on my side.**

Here's exactly how it works, including the code you can steal.

## The Workflow at a Glance

The pipeline has five stages to go from Kindle highlights to reliable study notes:

1. **Highlight with intent** — tag passages in my Kindle app with a color key based on the notes’ importance.
2. **Export from Kindle** — grab the raw HTML file
3. **Preprocess** — run the HTML through a Python script that converts it into structured Markdown with semantic prefixes
4. **Generate the study notes** — run an AI prompt that transforms the Markdown into a polished, 1000+ word study guide
5. **Reinforce (optional)** — run a second AI prompt that turns key concepts into spaced-repetition flashcards

The output looks like this: a [14-section, organized summary of *The Clean Coder* by Robert C. Martin](https://app.notion.com/p/maxantonucci/The-Clean-Coder-2d843b564bfa80bf8df6e3b5109cdbc0?source=copy_link) that I can revisit any time without re-reading 200 pages.

Let's walk through each stage.

## Stage 1: Highlighting with Intent

Most people highlight books in one color. That's fine for "this seems important," but it gives an AI (or your future self) zero information about *why* you highlighted it. It could be a core argument, a supporting example, or something I want to quote verbatim.

I use all four of the Kindle app's highlight colors, each mapped to a specific semantic role:

- 🟡 Yellow is for standard ideas and arguments
- 🟠 Orange is for especially important ideas that need extra emphasis
- 🩷 {% footnoteref "pink" "For the record, I only used a heart emoji since there is no pink circle emoji for some reason. And yes, I have lodged a formal complaint." %}Pink{% endfootnoteref %} is for context that guides other points but is not standalone
- 🔵 Blue is for verbatim quotes that render as standalone

This system doesn't interrupt the flow of reading — I’m just reaching for a different color instead of the same one. **It encodes enough structure that the AI can later make intelligent decisions about what matters most.**

Kindle lets you attach text notes to any highlight, and I use this to capture stray thoughts, connections, or potential ideas. Those notes get merged into the relevant highlight during preprocessing so nothing gets lost.

## Stage 2: Exporting from Kindle

Kindle stores your highlights and notes in a notebook file accessible from the Kindle app. The raw, exported HTML output looks something like this.

```html
<div class="sectionHeading">1. Professionalism</div>
<div class="noteHeading">
  Highlight(<span class="highlight_orange">orange</span>)
</div>
<div class="noteText">
  Professionalism is a loaded term. Certainly it is a badge of
  honor and pride, but it is also a marker of responsibility
  and accountability.
</div>
```

This is parseable but also noisy, and is exactly the kind of tedious data-munging task I love writing scripts for.

One unexpected benefit of these exports: Kindle limits how much of a book you can export as highlights (usually a percentage cap). At first this annoyed me, but now I consider it as curation enforcement. I have to highlight only what genuinely matters, not every third paragraph.

## Stage 3: The Preprocessing Script

I originally wrote this step as [a Ruby script](https://github.com/maxx1128/kindle-highlight-processor) (240 lines across four small classes) using Nokogiri to parse the HTML, extract elements by CSS class, and map color classes to semantic prefixes. I've since ported it to Python since it increasingly dominates the AI/LLM ecosystem, and this tool sits squarely in that world.

The script does exactly four things:

1. **Parse** the Kindle HTML and extract the book title, author(s), chapter headings, and every highlight/note pair.
2. **Map** highlight colors to semantic prefixes: `IMPORTANT:` for orange, `CONTEXT:` for pink, `DIRECT QUOTE:` for blue, and none for yellow.
3. **Attach** user-written notes to the highlight that precedes them. A note I jotted down about a passage gets merged into that passage's bullet point.
4. **Output** clean Markdown with `## CHAPTER:` headers and bullet-pointed highlights

Here's what that HTML excerpt looks like after it’s run through this script:

```markdown
## 2. Saying No

* IMPORTANT: The most important time to say no is when the stakes
are highest. The higher the stakes, the more valuable no becomes.
```

The full Python script is [available on GitHub](https://github.com/maxx1128/kindle-highlight-processor-python) — four files, no dependencies beyond BeautifulSoup. Drop your Kindle HTML exports into a `notes/` directory and run `make run`. This will  process them all and put them in the `markdown/` directory.

## Stage 4: The AI Prompt

{% footnoteref "magic" "And by 'magic,' I mean 'prompt engineering that took several iterations to get right.'" %}This is where the magic happens.{% endfootnoteref %}

The processed Markdown gets fed to an AI model with a structured prompt. I use Claude as I've found it emphasizes analytical detail and is less prone to dropping information. The [full prompt lives here as a Notion page](https://app.notion.com/p/maxantonucci/Skill-Reference-Book-Notes-38843b564bfa81f2aba7e8e69f691025?source=copy_link) that I keep updated, but the high-level principles are:

- **Minimum 1,000 words.** This isn't a bullet-list summary. It's a usable study guide.
- **Key Takeaways section at the top** — 3-5 bullets with emojis, each actionable
- **Thematic Summary sections** written in cohesive prose, not grouped bullets. The AI organizes highlights by theme, not by chapter order.
- **Semantic prefix rules** determine formatting: `IMPORTANT` content gets bolded and wrapped in callouts, `DIRECT QUOTE` becomes a block quote, `CONTEXT` guides framing but doesn't appear standalone
- **No meta-commentary.** The output should read like natural notes, not like "the highlights say" or "there's a bullet about"

The cost for all this? Pennies per book, if any at all. Even a dense 300-page nonfiction book with hundreds of highlights costs a fraction of a dollar to process through Claude's API. Even if that’s too much, you can run it through a free model like Gemini.

## Stage 5: The Output

[The notes for “The Clean Coder”](https://app.notion.com/p/maxantonucci/The-Clean-Coder-2d843b564bfa80bf8df6e3b5109cdbc0?source=copy_link) are organized into thematic sections with prose that flows naturally. Each section synthesizes multiple highlights into coherent arguments, with bolded key concepts, callout blocks, and block quotes.

What I love about this format is that it's genuinely *usable*. **Six months after reading the book, I can open this page and in 90 seconds refresh myself on the major arguments.** I can search for "TDD" or "estimation" and land exactly where I need. It's not a replacement for the book, and if I need a serious refresh then I’ll reread the section. But it's a strong exoskeleton for my long-term memory.

All processed notes live in my Notion book database — searchable, filterable, and linked to related projects and goals. The AI output gets saved directly to the corresponding book page using a Notion automation. So the entire pipeline from "finished reading" to "study guide ready" is one script run and one AI call.

Fun fact: when this script was completed, I exported the highlights for over a dozen books I read over the last few years. The highlights were all yellow, but the resulting notes were still informative and concise.

## Bonus: Flashcards for Spaced Reinforcement

Notes are great for reference, but for ideas I want truly internalized, I learned I need to go one step further. That requires converting the notes into a format that’s easier for small, routine reviews: flashcards.

To do this, I run the notes through [a second AI prompt that converts them into Q&A flashcards](https://app.notion.com/p/maxantonucci/Skill-Reference-Notion-to-Flashcards-38843b564bfa814da84af1bbf0a83ae6?source=copy_link). The specific output is a CSV file importable into AlgoApp. It’s a spaced-repetition app that review cards at algorithmically optimized intervals. **This means all my book notes can be imported and reviewed at any time, and the app keeps track of my strong and weak points.**

The best part? Each deck can be reviewed on its own, or with a collection of other decks. So I can make a collection for programming, one for personal development, one for communication, and more. I can reinforce my knowledge on any topic at any point.

Between the study  guide notes and the spaced repetition cards, I've built a system where a book I read two years ago will actively contribute to what I know today with minimal friction and effort.

## The Script’s Honest Limitations

This has worked well for me so far, but of course it’s not perfect. Here's what I've learned about the edge cases so far:

- **Very long books** with hundreds of highlights can push against context-window limits, occasionally causing the AI to truncate or mix information from different sections. Splitting exceptionally dense books into two passes helps.
- **Anything that isn't analytical nonfiction** (fiction, poetry, code-heavy technical books) confuses the model. It's tuned for argumentative prose, not narrative structure or code review. Anything else will likely need a modified script.
- **The AI occasionally hallucinates details or connections between highlights** that aren't actually related. A quick human review pass (5-10 minutes) catches these errors.

In my opinion, the trade-off — pennies and 10 minutes of review for a permanent, searchable knowledge base of every book I read — is absolutely worth it.

## Steal This Workflow

Everything I've described is available for you to adapt as you see fit.

- [**The Clean Coder Notes**](https://app.notion.com/p/maxantonucci/The-Clean-Coder-2d843b564bfa80bf8df6e3b5109cdbc0?source=copy_link) as a real example of what the pipeline produces
- [**The Python preprocessing script**](https://github.com/maxx1128/kindle-highlight-processor-python) to run your Kindle exports through
- [**The AI book notes prompt**](https://app.notion.com/p/maxantonucci/Skill-Reference-Book-Notes-38843b564bfa81f2aba7e8e69f691025?source=copy_link) is the exact prompt I use for generating readable book notes
- [**The flashcard generation prompt**](https://app.notion.com/p/maxantonucci/Skill-Reference-Notion-to-Flashcards-38843b564bfa814da84af1bbf0a83ae6?source=copy_link) for turning book notes into CSV flashcard data

The whole thing costs pennies per book (at most), takes maybe 15 minutes of human attention to review the AI output, and produces a permanent, searchable knowledge base of everything I've read. **This is one of the best uses for AI I think there currently is - as a scaffold and accelerant to existing knowledge and strengths.**

If you're a big reader like me, these tools are for you.