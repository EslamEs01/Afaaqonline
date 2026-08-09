# Kimi continuation contract

This repository contains the approved Afaaq public website plus its Django backend.

Before changing anything:

1. Read `README.md` and `docs/brand-guidelines.md` in full.
2. Preserve RTL, the route set, design tokens, local assets, local font, accessibility labels, and responsive behavior.
3. Do not replace the design with a generic template, another framework, a CDN, or external image hotlinks.
4. Do not invent social-media links, prices, payment methods, or backend behavior. The current testimonial cards are design-stage demonstration copy and must be replaced with approved real reviews before production launch.
5. Keep every button and link functional; never add dead controls or placeholders.
6. Treat the React frontend as the visual source of truth. Keep the Django API contract, model migrations, seed command, and VPS configuration backward-compatible.
7. Never report a form submission as successful before the Django API confirms persistence.
8. Run `npm run lint`, `npm test`, `npm run validate:artifact`, `backend/.venv/bin/python backend/manage.py makemigrations --check --dry-run`, and the Django tests after relevant changes.

The current contact details are:

- `https://afaaqinstitute.com`
- `+20 104 139 1631`
- `afaaqinstitute@gmail.com`
