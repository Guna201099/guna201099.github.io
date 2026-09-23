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

## Going live on GitHub Pages

Your CV prints **guna201099.github.io**, and every copy of it links there.
Publish before you send anything. A dead link on a CV is worse than no link.

### 1. Make the repository

The name has to be **exactly** your username plus `.github.io`, or Pages will
not serve it at the short address.

1. Sign in as `Guna201099` and go to **https://github.com/new**
2. Repository name: `guna201099.github.io`
3. **Public**. Leave every checkbox unticked, so the repo starts empty.
4. Create repository.

### 2. Upload the site

On the empty repo page, click **uploading an existing file**.

Open `F:\JobHunt\portfolio` in Explorer, select `index.html`, `work.html`,
`about.html`, `README.md` and the whole `assets` folder, and drag them onto the
page. Wait for all of it to finish uploading, then **Commit changes**.

`index.html` must end up at the top level, with `assets/` beside it. If you see
`portfolio/index.html` in the repo, the folder itself got dragged instead of its
contents. Delete and redo.

### 3. Turn Pages on

Settings, Pages, Source: **Deploy from a branch**, branch `main`, folder
**`/ (root)`**, Save.

Give it two or three minutes, then open **https://guna201099.github.io**.
The first build is the slow one. Everything after it is quick.

### 4. Put the link on your GitHub profile

Two places, both worth doing, because a recruiter who has your CV will often
look at the GitHub account too.

**The website field.** Click your avatar, Settings, Public profile. Fill in:

| Field | Value |
|---|---|
| Name | `Guna Thiagarajan` |
| Bio | `Sensors, test benches and machine learning. M.Sc. Sustainable Energy Systems, TU Dortmund.` |
| URL | `https://guna201099.github.io` |
| Company | `Fraunhofer UMSICHT` |
| Location | `Dortmund, Germany` |

The URL shows as a clickable link in the left column of your profile.

**The profile page itself.** GitHub shows the README of a repository named after
you at the top of your profile. There is one ready at
`F:\JobHunt\github-profile\README.md`.

1. **https://github.com/new**, repository name `Guna201099` (exactly your
   username). GitHub will say "you found a secret" when you type it.
2. Public, tick **Add a README file**, create.
3. Open the README, click the pencil, paste in the contents of that file, commit.

**Pin the site repo.** On your profile, Customize your pins, tick
`guna201099.github.io`. That puts it in the big box people actually look at.

### Later, for about 5 euros a year

Buy `gunathiagarajan.de` at any registrar, add a file called `CNAME` to the
repository root containing just that domain, and point the domain's DNS at
GitHub. The site keeps working at both addresses. Tell me when you have it and
I will change all the CVs in one pass.

---

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
