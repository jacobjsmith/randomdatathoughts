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
   - The signature mark path — change the numbers in `d="M1 4 L6 11..."`
     to any squiggle you like; it doesn't need to mean anything, that's the point
   - `<h1>` and `.post-dek`
   - Byline date and read time
   - Body content — keep the section pattern (Business question → Why this
     matters → Approach → Build → Findings → What I'd do next), but it's
     a guide, not a rule
   - Swap the Tableau `<iframe src="...">` for your real embed URL (see below)
   - Update the footer nav links to point to your real previous/next posts
3. Add a matching `<a class="entry">` block to **both**:
   - `index.html` (only if it should appear in "Latest" — keep this to your
     3-4 most recent)
   - `archive.html` (every post goes here, with the correct `data-category`
     attribute so the filter buttons work: `finance`, `real-estate`, `tech`,
     `transportation`, or `health`)

## Adding a new quick take

Same process, but duplicate `posts/quick-take-transit.html` instead — it's
shorter and skips the heavy SQL/Python code sections. Use the `tag type-quick`
class on its entry-list tag so it visually reads as lighter content.

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

## A note on the signature mark

Every post has a small squiggle icon next to its date (`<svg class="mark">`).
It's meant to look slightly different on every post — that's the "random" in
randomdatathoughts. When you add a post, just change a few of the numbers in
the `d="M1 4 L6 11 L11 6..."` path to nudge the shape. There's no correct
answer here; any sequence of coordinates that stays roughly within the
`viewBox="0 0 28 16"` will look fine.
