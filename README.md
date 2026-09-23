# Portfolio site

Three pages, no build step, no dependencies. Open `index.html` to view it locally.

```
index.html      home: who you are, what you want, the dashboard video, four figures, three projects
work.html       nine projects in three groups, with video
about.html      experience, education, publications, tools
assets/
  css/site.css  one stylesheet, light and dark themes
  js/site.js    analytics, theme, scroll animation, video behaviour
  img-profile.jpg
  Guna_Thiagarajan_CV.pdf
  poster/       poster frames and stills
  video/web/    ten web-encoded videos, about 42 MB total
```

## It is live

**https://guna201099.github.io**

Deployed 23 September 2026. Every CV links there and the link is clickable in
the PDF.

| What | Where |
|---|---|
| Site repo | https://github.com/Guna201099/guna201099.github.io |
| Profile repo | https://github.com/Guna201099/Guna201099 |
| Pages source | branch `main`, folder `/ (root)`, HTTPS enforced |
| Analytics | https://gunathiagarajan.goatcounter.com |

### One thing left, and it needs a browser

GitHub removed repo pinning from their API, so it cannot be scripted. On
https://github.com/Guna201099, click **Customize your pins** and tick
`guna201099.github.io`. Ten seconds, and it puts the site in the big box on your
profile instead of leaving it in the repository list.

### Updating the site later

This folder is the git repository. Edit the files here, then:

```bash
cd /f/JobHunt/portfolio
git add -A
git commit -m "what changed"
git push
```

Live again in about a minute. If the CV changes, copy the new PDF over
`assets/Guna_Thiagarajan_CV.pdf` first, since the site serves its own copy.

### Later, for about 5 euros a year

Buy `gunathiagarajan.de` at any registrar, add a file called `CNAME` to the
repository root containing just that domain, and point the domain's DNS at
GitHub. The site keeps working at both addresses. Tell me when you have it and
I will change all the CVs in one pass.


## Visitor analytics

Already set up. `assets/js/site.js` line 12 holds your GoatCounter code:

```js
var GOATCOUNTER_CODE = 'gunathiagarajan';
```

Your statistics are at **https://gunathiagarajan.goatcounter.com**.

### What you will see

- How many people visited, and how many were new
- Which pages they opened, so you learn whether anyone reaches Work
- **Where they came from**: an application portal, LinkedIn, a direct click
  from your CV
- Which country, browser and screen size
- **How long they stayed**, as buckets under `dwell/`, for example
  `dwell/work/2-5min`. Sent when the tab is hidden or closed.
- **`cv-download`** every time somebody opens the PDF. That one is the signal
  worth watching.

### What you will not see

Not individual people. GoatCounter sets no cookies and stores no personal data,
which is exactly why it needs no consent banner. You will know that someone in
Aachen spent four minutes on the Work page. You will not know who. For a job
search that is the useful half anyway, and the legal exposure of the other half
is not worth it in Germany.

Empty the string and no analytics script loads at all.

---

## The videos

Nine came from your Drive folder and the dashboard walkthrough came later. All of
them are compressed for the web: 790 MB down to 42 MB, whole site included.
H.264 at CRF 26 to 30, 1280 across the long edge, with `faststart` so playback
starts before the download finishes. Your originals in Drive are untouched.

The two phone clips, the water dispenser and the four-legged robot, were
originally scaled to 1280 **wide** even though they are portrait, which made them
1280 by 2276 and cost 30 MB between them for no visible gain. They are now scaled
by height instead.

Poster frames are pulled from inside each clip with ffmpeg, never from the
opening title card.

The dashboard clip has the Windows taskbar cropped off the bottom. If you record
a new one, use a clean desktop or tell me and I will crop it again.

## Motion

Four different entrances, set by `data-anim` on the element:

| value | what happens | used on |
|---|---|---|
| `rise` | lifts and fades in | headings, text blocks |
| `wipe` | uncovers from the bottom edge | video and images |
| `scale` | settles in from slightly small | cards |
| `seq` | children arrive one after another | grids, lists, the layer panel |

One fade on everything is a sign nobody chose it, so each kind of content moves
differently. The four figures on the home page count up from zero, and the real
number is written in the HTML so it is still correct if the script never runs.
`prefers-reduced-motion: reduce` turns all of it off.

## Editing

Content is plain HTML in the three pages. Colours are CSS custom properties at
the top of `assets/css/site.css` under `:root`, with the dark theme redefining
the same names further down. The theme toggle sits in the nav and remembers the
choice.

Two rules worth keeping when you edit the copy, both in
`.claude\skills\no-ai-slop`:

- No em dashes, and no comma before "and" or "or".
- Plain sentence first, technical sentence second. Every project has a
  `<p class="tech">` for the vocabulary, so the paragraph above it can stay in
  words anyone follows.
