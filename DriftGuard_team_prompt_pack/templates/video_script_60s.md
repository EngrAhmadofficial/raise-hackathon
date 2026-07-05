# 60-Second Video Script

## 0-5 seconds — Problem

AI agents help teams ship faster, but they often bypass design systems while doing it.

## 5-15 seconds — Product

This is DriftGuard: a Cursor-native design drift auditor. It scans React and Next.js code against local tokens, shared components, and markdown guardrails.

## 15-35 seconds — Demo

Here, Cursor makes a billing upgrade card more prominent. The UI looks okay, but the code drifts: hardcoded color, arbitrary spacing, arbitrary radius, custom text size, and a raw button.

Now we run DriftGuard. It detects the drift, shows the evidence, explains why it matters, and classifies it as accidental regression.

## 35-50 seconds — Fix

DriftGuard generates a git-style patch. The patch replaces raw Tailwind values with the shared Card and Button components. We apply it, refresh, and the UI still looks polished — but now it is design-system compliant.

## 50-60 seconds — Memory

Finally, DriftGuard records a markdown incident linked to the violated rules. The codebase now remembers this class of drift.

Cursor helps engineers ship faster. DriftGuard helps teams keep their design system consistent while they ship faster.
