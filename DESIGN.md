# Northstar Platform DESIGN.md
Agents as a Service — mobile-first product UI

## Intent
Blend **Claude warmth** (readable, human) with **Linear density** (product chrome) and **xAI restraint** (no visual noise). Phone is primary. Desktop is enhancement.

## Tokens
- canvas: `#0c0d0f` (app dark default)
- surface: `#141518`
- elevated: `#1c1e24`
- parchment (marketing light): `#f5f4ed`
- text: `#f4f3ef`
- muted: `#9b9a94`
- accent: `#c96442` (terracotta CTA)
- accent-2: `#7170ff` (focus / links in app)
- ok: `#34d399` warn: `#fbbf24` bad: `#f87171`
- border: `rgba(255,255,255,0.08)`
- radius: 12px cards, 999px pills, 16px sheets
- type: Inter (UI) + Instrument Serif (marketing display only)
- touch: min 44px targets; bottom tab bar on mobile

## Mobile rules
1. Bottom nav: Home · Agents · Connect · Inbox · More
2. Primary actions sticky bottom sheet, not top-right only
3. Settings fully usable on phone (no desktop-only advanced panels)
4. Workspace switcher = full-screen sheet
5. One primary CTA per screen

## Roles
Platform / Reseller / Business — navigation trees differ (see README).
