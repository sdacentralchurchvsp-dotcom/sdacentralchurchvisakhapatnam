# SDA Central Church, Visakhapatnam — Website

A responsive static website for the Seventh-day Adventist Central Church, Visakhapatnam (**sdacentralchurchvizag.in**).

Built with plain HTML, CSS, and vanilla JavaScript — no build step required. Host it on any static host (Netlify, GitHub Pages, cPanel/shared hosting, etc.).

## Pages

| File | Page |
|------|------|
| `index.html` | Home — hero, service times, welcome, ministries preview, events |
| `about.html` | About — story, mission/vision, pastor's message, core beliefs |
| `ministries.html` | Ministries — Sabbath School, Youth (AY), Children, Women, Men, Music, etc. |
| `sermons.html` | Sermons — message library (placeholders) |
| `events.html` | Events — upcoming programs and calendar |
| `give.html` | Give — tithes & offerings info |
| `contact.html` | Contact — address, service times, map, contact form |

## Project structure

```
.
├── index.html / about.html / ministries.html / sermons.html / events.html / give.html / contact.html
├── assets/
│   ├── css/style.css     # theme + all styles (navy + gold)
│   ├── js/main.js        # mobile nav, active link, footer year, contact form handler
│   └── img/              # put hero.jpg and other images here (see README.txt)
└── README.md
```

## Customize before going live

1. **Contact details** — replace `+91 00000 00000`, the email, and the address (search these across the HTML files).
2. **Service times** — update if different (currently Sabbath School Sat 9:15 AM, Divine Worship Sat 11:00 AM, Prayer Meeting Wed 7:00 PM).
3. **Hero image** — drop a `hero.jpg` into `assets/img/` (referenced by the CSS).
4. **Map** — in `contact.html`, replace the Google Maps embed `src` with your exact location.
5. **Social links** — update the Facebook / YouTube / Instagram `href="#"` links.
6. **Sermons & events** — replace placeholder cards with real content/links.
7. **Contact form** — currently a client-side demo. Connect it to a mail service (Formspree, Netlify Forms, or your own backend) to receive messages.

## Run locally

Any static server works. For example, with Python:

```
python -m http.server 8000
```

Then open http://localhost:8000
