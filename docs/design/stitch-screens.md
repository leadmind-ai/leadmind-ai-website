# Stitch Mockups — LeadMind AI Site Vitrine

**Project ID:** `17740655240384947096`
**Stitch Project:** `projects/17740655240384947096`

## Screens

| Page | Device | Screen ID | Title | Status |
|------|--------|-----------|-------|--------|
| Home v1 | Desktop | `4edd61d31a874fe384f5f242e6fd3581` | LeadMind AI Landing Page | Generated |
| Home v2 | Desktop | `9a0d6b6664fc451d8b402043f14c0366` | LeadMind AI Landing Page | Generated |
| Home | Mobile | `fd4a73e3129042d1954d0a7aff63b920` | LeadMind AI Mobile Landing Page | Generated |
| About | Desktop | `79dd16d56e624a46a97acddc496dae9e` | LeadMind AI About Us Page | Generated |
| Formations | Desktop | `7d3de232d4f847c09e4a74ec804e13dc` | LeadMind AI Services & Training Page | Generated |
| Contact | Desktop | `3098c3933bbd4439830e579ea610cf6d` | LeadMind AI Contact Page | Generated |

## Design decisions
- Design system: Navy (#1a365d) + Teal (#0d9488), Inter font, white background
- Two Home variants generated — pick preferred during implementation
- All 6/6 screens complete

## Notes
- Jest config: correct key is `setupFilesAfterEnv` (not `setupFilesAfterSetup` as in original plan)
- Next.js 16: `next/jest` requires `.js` extension → `next/jest.js`
- Next.js 16: `middleware` deprecated in favor of `proxy` (still works)
