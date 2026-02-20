---
name: tailwind-cli
description: Tailwind CLI build command, options, and watch mode
---

# Tailwind CLI

The `@tailwindcss/cli` package provides a standalone build command for compiling Tailwind CSS without a bundler.

## Usage

```bash
npx @tailwindcss/cli -i <input.css> -o <output.css> [options]
```

Input and output default to stdin and stdout when not specified. If stdout is a TTY and no args are given, help is shown.

## Options

| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--input` | `-i` | Input CSS file | — |
| `--output` | `-o` | Output file | `-` (stdout) |
| `--watch` | `-w` | Watch and rebuild | — |
| `--minify` | `-m` | Minify output | — |
| `--optimize` | — | Optimize without minifying | — |
| `--cwd` | — | Working directory | `.` |
| `--map` | — | Emit source map | `false` |
| `--help` | `-h` | Show help | — |

**Watch:** use `--watch` or `-w`. Use `--watch always` to keep watching after stdin is closed.

## Examples

```bash
# One-off build
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css

# Watch mode
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch

# Minified production build
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --minify

# With source map
npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --map

# Run from different directory
npx @tailwindcss/cli --cwd ./packages/web -i ./src/input.css -o ./dist/output.css
```

## Key Points

- Input CSS must contain `@import "tailwindcss";` (and any `@theme` / `@source` you need).
- Scanning and output paths are relative to `--cwd` when set.
- Standalone executables are available from the repo releases if you want to run without Node.

<!--
Source references:
- https://tailwindcss.com/docs/installation/tailwind-cli
- sources/tailwindcss/packages/@tailwindcss-cli/
-->
