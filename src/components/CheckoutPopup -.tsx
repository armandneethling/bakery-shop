ast position, the first position, or
    the second position in a pattern starting with `/`, as this
    may indicate a UNC path on Windows).
  - Convert patterns containing `<pre>/**/../<p>/<rest>` into the
    equivalent `<pre>/{..,**}/<p>/<rest>`, where `<p>` is a
    a pattern portion other than `.`, `..`, `**`, or empty
    `''`.
  - Dedupe patterns where a `**` portion is present in one and
    omitted in another, and it is not the final path portion, and
    they are otherwise equivalent. So `{a/**/b,a/b}` becomes
    `a/**/b`, because `**` matches against an empty path portion.
  - Dedupe patterns where a `*` portion is present in one, and a
    non-dot pattern other than `**`, `.`, `..`, or `''` is in the
    same position in the other. So `a/{*,x}/b` becomes `a/*/b`,
    because `*` can match against `x`.

  While these optimizations improve the performance of
  file-walking use cases such as [glob](http://npm.im/glob) (ie,
  the reason this module exists), there are cases where it will
  fail to match a literal string that would have been matched in
  optimization level 1 or 0.

  Specifically, while the `Minimatch.match()` method will
  optimize the file path string in the same ways, resulting in
  the same matches, it will fail when tested with the regular
  expression provided by `Minimatch.makeRe()`, unless the path
  string is first processed with
  `minimatch.levelTwoFileOptimize()` or similar.

### platform

When set to `win32`, this will trigger all windows-specific
behaviors (special handling for UNC paths, and treating `\` as
separators in file paths for comparison.)

Defaults to the value of `process.platform`.

## Comparisons to other fnmatch/glob implementations

While strict compliance with the existing standards is a
worthwhile goal, some discrepancies exist between minimatch and
other implementations. Some are intentional, and some are
unavoidable.

If the pattern starts with a `!` character, then it is negated. Set the
`nonegate` flag to suppress this behavior, and treat leading `!`
characters normally. This is perhaps relevant if you wish to start the
pattern with a negative extglob pattern like `!(a|B)`. Multiple `!`
characters at the start of a pattern will negate the pattern multiple
times.

If a pattern starts with `#`, then it is treated as a comment, and
will not match anything. Use `\#` to match a literal `#` at the
start of a line, or set the `nocomment` flag to suppress this behavior.

The double-star character `**` is supported by default, unless the
`noglobstar` flag is set. This is supported in the manner of bsdglob
and bash 4.1, where `**` only has special significance if it is the only
thing in a path part. That is, `a/**/b` will match `a/x/y/b`, but
`a/**b` will not.

If an escaped pattern has no matches, and the `nonull` flag is set,
then minimatch.match returns the pattern as-provided, rather than
interpreting the character escapes. For example,
`minimatch.match([], "\\*a\\?")` will return `"\\*a\\?"` rather than
`"*a?"`. This is akin to setting the `nullglob` option in bash, except
that it does not resolve escaped pattern characters.

If brace expansion is not disabled, then it is performed before any
other interpretation of the glob pattern. Thus, a pattern like
`+(a|{b),c)}`, which would not be valid in bash or zsh, is expanded
**first** into the set of `+(a|b)` and `+(a|c)`, and those patterns are
checked for validity. Since those two are valid, matching proceeds.

Negated extglob patterns are handled as closely as possible to
Bash semantics, but there are some cases with negative extglobs
which are exceedingly difficult to express in a JavaScript
regular expression. In particular the negated pattern
`<start>!(<pattern>*|)*` will in bash match anything that does
not start with `<start><pattern>`. However,
`<start>!(<pattern>*)*` _will_ match paths starting with
`<start><pattern>`, because the empty string can match against
the negated portion. In this library, `<start>!(<pattern>*|)*`
will _not_ match any pattern starting with `<start>`, due to a
difference in precisely which patterns are considered "greedy" in
Regular Expressions vs bash path expansion. This may be fixable,
but not without incurring some complexity and performance costs,
and the trade-off seems to not be worth pursuing.

Note that `fnmatch(3)` in libc is an extremely naive string comparison
matcher, which does not do anything special for slashes. This library is
designed to be used in glob searching and file walkers, and so it does do
special things with `/`. Thus, `foo*` will not match `foo/bar` in this
library, even though it would in `fnmatch(3)`.
                                                          