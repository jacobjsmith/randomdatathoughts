# How to publish new content on randomdatathoughts

This site is plain HTML/CSS/JS — no build step, no database, no CMS.
New posts are new files. This is deliberate: it's the simplest thing that
can possibly work, and it costs nothing to host.

## Adding a new full project post

1. Duplicate `posts/hmda-credit-risk.html` and rename it
   (e.g. `posts/market-entry-chicago.html`).
2. Edit, top to bottom:
   - `<title>` and `<meta name="description">` in the `<head>`
   - The eyebrow line (`Full project · [Category]`)
   - `<h1>` (headlines are Title Case) and `.post-dek`
   - Byline date and read time
   - Body content — keep the section pattern (Business question → Why this
     matters → Approach → Build → Findings → What I'd do next), but it's
     a guide, not a rule
   - Swap the Tableau `<iframe src="...">` for your real embed URL (see below)
   - Update the footer nav links to point to your real previous/next posts
3. Add it to `archive.html`: copy an `<a class="entry">` block, with the correct
   `data-category` attribute so the filters and section nav work: `finance`,
   `real-estate`, `tech`, `transportation`, or `health`.
4. Update the front page (`index.html`). It's laid out like a newspaper front page:
   - **Lead story** (`.front-lead`): the newest full project. It has a chart in
     place of a lead photo. Swap in a chart from the new post, or delete the
     `<figure class="chart-figure">` block and let the headline lead on its own.
     Move the old lead's `<article class="story">` into the left column.
   - **Left column** (`.front-left`): the next one or two full projects.
   - **Quick Takes** (`.front-right`): quick takes go here.
   - **Ticker** (`.ticker`): headline numbers from the lead post. Each figure is a
     `.tick`; add `is-up` (red) or `is-down` (green) and a `.tick-delta` when a
     number is above or below a baseline. Plain `.tick` for neutral numbers.

## Adding a new quick take

Same process, but duplicate `posts/quick-take-transit.html` instead — it's
shorter and skips the heavy SQL/Python code sections. Use the `tag type-quick`
class on its archive tag, and put it in the front page's Quick Takes rail.

## Embedding a Tableau Public dashboard

1. Publish your viz to Tableau Public as normal.
2. On the published view, click **Share** → copy the **Embed Code**.
3. From that embed code, pull out just the `src="..."` URL.
4. In your post's HTML, find the `.embed-box` div and replace the iframe's
   `src` attribute with that URL. Leave everything else (the wrapping divs,
   the `ratio-16-9` class) as-is — that's what keeps the embed responsive.

```html
<div class="embed-frame">
  <span class="embed-label">Your label here</span>
  <div class="embed-box ratio-16-9">
    <iframe src="PASTE_YOUR_TABLEAU_URL_HERE" allowfullscreen></iframe>
  </div>
</div>
```

### Wide dashboards

Tableau dashboards built at a fixed size wider than the text column (e.g. 1280×820)
get cramped in the normal embed. Add `embed-wide` to the `.embed-frame` so it breaks
out to the wide layout width, and set the aspect ratio to match the dashboard:

```html
<div class="embed-frame embed-wide">
  <span class="embed-label">Your label here</span>
  <div class="embed-box" style="aspect-ratio: 1280 / 820;">
    <iframe src="PASTE_YOUR_TABLEAU_URL_HERE" allowfullscreen></iframe>
  </div>
</div>
```

In Tableau, setting the dashboard **Size** to **Automatic** before publishing lets it
scale to whatever width the embed gets.

## Embedding a Power BI report

Power BI's process is nearly identical:

1. In Power BI Service, open the report → **File** → **Embed report** →
   **Publish to web (public)**.
2. Copy the iframe `src` URL it gives you.
3. Paste it into the same `.embed-box` pattern shown above.

Power BI's public embeds are sometimes slightly wider than 16:9 — if it looks
cropped, change the class from `ratio-16-9` to `ratio-4-3`, or edit the
`aspect-ratio` value directly in `css/style.css` under `.embed-box`.

## Embedding video

**YouTube:** grab the video ID from the URL (the part after `v=`) and use:

```html
<div class="embed-frame">
  <span class="embed-label">Your label here</span>
  <div class="embed-box ratio-16-9">
    <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" allowfullscreen></iframe>
  </div>
</div>
```

**Self-hosted video file:** if you'd rather upload your own `.mp4` (e.g. a
screen recording walking through a dashboard), drop the file in `/images/`
(or a new `/video/` folder) and use a native `<video>` tag instead of an
iframe:

```html
<div class="embed-frame">
  <span class="embed-label">Your label here</span>
  <div class="embed-box ratio-16-9">
    <video controls style="position:absolute; inset:0; width:100%; height:100%;">
      <source src="../video/your-file.mp4" type="video/mp4">
    </video>
  </div>
</div>
```

Keep video files reasonably small (compress before uploading) — large `.mp4`
files will slow down page load and most static hosts cap free-tier bandwidth.
