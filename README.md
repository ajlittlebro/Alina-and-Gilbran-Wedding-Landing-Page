# Event Landing Page – Wedding Invitation

> **🔒 Privacy update (November 2026):** this repository was reviewed for data protection (GDPR). For portfolio purposes, a separate showcase demo with fictitious names, places, dates and images is published at https://event-landing-demo.vercel.app/. The gallery column-equalization routine was also fixed.

**Showcase demo (anonymized):** https://event-landing-demo.vercel.app/

A responsive single-page wedding invitation built with **HTML5, CSS3 and vanilla JavaScript (ES6+)**: countdown, itinerary, photo gallery, dress code, gift and hotel recommendations, "save the date" and an RSVP flow.

> The production site was created for a real family event and its content is kept unchanged as a family keepsake. The showcase demo linked above uses fictitious names, places, dates and placeholder images.

## Frontend engineering highlights

- **Masonry gallery with equalized columns** – the gallery is laid out with [Packery](https://packery.metafizzy.co/) once all images are ready ([imagesLoaded](https://imagesloaded.desandro.com/)). A custom `equalizeColumnHeights()` routine groups items by column and stretches the last image of every shorter column (`object-fit: cover`) so all columns end on the same baseline; it re-runs after each layout and on (debounced) window resize.
- **AVIF image pipeline** – all photos are served as `.avif` for small file sizes, with `loading="lazy"` in the gallery.
- **Custom lightbox** – click any photo to open it full-screen; closes via button, backdrop click or `Esc`, and locks background scrolling while open (no external library).
- **Live countdown** to the ceremony, updated every second.
- **Google Calendar event generator** – a pre-filled `calendar.google.com/calendar/render?action=TEMPLATE` link with title, start/end time (UTC), details and location.
- **Interactive RSVP modal** – attend / not attend choice with guest counter; builds a pre-formatted message for WhatsApp (`wa.me`) – in the showcase demo it only previews the message.
- **Mobile performance** – GPU-promoted layers (`transform: translateZ(0)`, `will-change`, `backface-visibility`) to keep animations and the fixed background smooth on phones; responsive breakpoints switch the gallery between 4, 3 and 2 columns.

## Tech stack
| Area | Technology |
| --- | --- |
| Markup & styling | HTML5, CSS3 (custom properties, media queries, keyframe animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Layout | Packery 2 + imagesLoaded 5 (CDN) |
| Icons & fonts | Font Awesome 6, Google Fonts |
| Hosting | Netlify (production) · Vercel (showcase demo) |

## Run locally
No build step – open `index.html` in a browser or serve the folder:

```bash
npx serve .
```

## Author
Built by Alain Josué Tolentino Ibarra – [Portfolio](https://alain-tolentino-portfolio.vercel.app/en/) · [GitHub](https://github.com/ajlittlebro)
