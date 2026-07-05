/**
 * Minimal glob matcher supporting `**`, `*` and `?` — enough for the
 * `target_paths` / `exempt_paths` patterns used in rule frontmatter.
 */
export function globToRegExp(pattern: string): RegExp {
  let regex = "";
  let i = 0;
  while (i < pattern.length) {
    const char = pattern[i];
    if (char === "*") {
      if (pattern[i + 1] === "*") {
        // `**/` matches zero or more path segments; bare `**` matches anything
        if (pattern[i + 2] === "/") {
          regex += "(?:[^/]+/)*";
          i += 3;
        } else {
          regex += ".*";
          i += 2;
        }
      } else {
        regex += "[^/]*";
        i += 1;
      }
    } else if (char === "?") {
      regex += "[^/]";
      i += 1;
    } else {
      regex += char.replace(/[.+^${}()|[\]\\]/g, "\\$&");
      i += 1;
    }
  }
  return new RegExp(`^${regex}$`);
}

export function matchesAny(relPath: string, patterns: string[]): boolean {
  const normalized = relPath.replace(/\\/g, "/");
  return patterns.some(p => globToRegExp(p).test(normalized));
}
