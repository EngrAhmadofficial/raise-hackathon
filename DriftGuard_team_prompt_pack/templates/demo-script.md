# DriftGuard 90-Second Live Demo Script

We built DriftGuard because Cursor makes teams ship faster, but faster AI-generated code creates a new problem: design drift.

Here is a SaaS billing dashboard using our design system: shared Button, Card, spacing scale, radius scale, and color tokens.

Now we ask Cursor to make the upgrade card more prominent.

Cursor does what AI agents often do: it makes the UI look okay, but it bypasses the design system. It adds a raw button, hardcoded hex color, arbitrary spacing, custom radius, and custom text size.

Now we run DriftGuard.

DriftGuard scans the workspace, maps the change to local markdown design rules, and detects multiple issues: hardcoded brand color, spacing drift, radius drift, typography drift, and component misuse.

It also explains intent. This is classified as accidental regression, not intentional redesign, because the change is localized to one card while the rest of the app uses shared primitives.

Now we generate the patch.

The patch replaces raw Tailwind values with the shared Button and Card components.

Now we apply the fix.

The UI still looks polished, but the implementation is back in design-system compliance.

Finally, DriftGuard writes a markdown incident into the local memory graph, linking this issue to the violated rules. That means the codebase now remembers this class of drift.

Cursor helps engineers ship faster. DriftGuard helps teams keep their design system consistent while they ship faster.
