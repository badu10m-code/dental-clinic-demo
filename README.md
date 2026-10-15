# SmileCraft Dental Studio — demo clinic website

A premium, multi-page demo website for pitching to a dental clinic. All clinic names, doctors, reviews and phone numbers are **sample data**.

**Live:** https://badu10m-code.github.io/dental-clinic-demo/

## What is inside

- 9 public pages (home, about, services + prices, doctors, gallery, booking + FAQ, blog, privacy, security) and 5 long-form patient articles
- Editorial design: featured blocks, hairline lists, no uniform card grids; Fraunces + Inter; varied animations (hero ken-burns, scroll reveals, counters, marquee, hover micro-interactions, accordion)
- Landscape hero image, high-quality photography throughout
- SEO: full meta + Open Graph, canonicals, Dentist/Article/FAQPage/Person/Breadcrumb JSON-LD, sitemap.xml, robots.txt, llms.txt for AI answer engines (GEO)
- India-optimized: ₹ pricing, UPI/EMI payments, WhatsApp-first booking, same-day emergency slots
- Security: strict CSP, input sanitisation, no trackers, external links hardened; honest security page
- **Admin panel (demo, no password by design):** /admin/ — dashboard, appointments with status workflow and one-click WhatsApp confirmation drafts (wa.me prefilled with name, date, slot, ref, address), patients ledger, clinic updates publisher, site-wide settings. Data lives in the browser's localStorage only (seeded with 3 sample appointments). The banner inside states this plainly.
- Booking form on contact.html writes into the same store, so you can book from the site and see it appear in the admin panel instantly.

## Going live (for the client)

1. Swap sample data for the real clinic's details (Settings tab holds phone/address/hours in demo; source data in js/store.js).
2. Replace localStorage store with a real backend (encrypted DB + auth) as described on security.html.
3. Add the real domain, Google Search Console token and IndexNow key.

Built with plain HTML/CSS/JS. No frameworks, no trackers.
