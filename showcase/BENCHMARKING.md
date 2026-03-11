# Performance Benchmarking

The `benchmark.mjs` script measures production build performance for the `showcase` application, including build times and bundle sizes.

## Usage

Run from the `showcase/` directory:

```bash
# Basic benchmark (saves to timestamped file)
node benchmark.mjs

# With a label (saves to benchmark-<label>.json)
node benchmark.mjs v6.1.0

# With label and custom output file
node benchmark.mjs v6.1.0 benchmark-v6.1.0.json

# Compare two benchmark results
node benchmark.mjs compare benchmark-v5.1.0.json benchmark-v6.1.0.json
```

## Metrics

The script measures:

| Metric | Description |
|--------|-------------|
| **Build Time** | Average, min, and max across 3 iterations |
| **JS Bundle** | Total raw and gzipped size |
| **CSS Bundle** | Total raw and gzipped size |
| **File Count** | Number of files in `dist/` |
| **Source Maps** | Total source map size |
| **Largest Files** | Top 5 largest JS files |

## Output

Results are printed to the console and saved to a JSON file:

```
BENCHMARK RESULTS
------------------------------------------------------------

Version: 6.1.0

📊 Build Time (3 iterations):
   Average: 26.60s
   Min:     26.50s
   Max:     26.68s

📦 JavaScript Bundle:
   Raw:     6.19 MB (18 files)
   Gzipped: 1.34 MB

🎨 CSS Bundle:
   Raw:     423.01 KB (2 files)
   Gzipped: 49.08 KB
```

## Comparing Results

Use the `compare` command to diff two benchmark files:

```bash
node benchmark.mjs compare benchmark-v5.1.0.json benchmark-v6.1.0.json
```

Output shows absolute and percentage changes:

```
COMPARISON
============================================================

v5.1.0 vs v6.1.0

📊 Build Time:
   5.1.0: 29.03s
   6.1.0: 26.60s
   Change: -2.43s (-8.37%)

📦 JavaScript Bundle (gzipped):
   5.1.0: 1.32 MB
   6.1.0: 1.34 MB
   Change: +20 KB (+1.52%)
```

## JSON Schema

The output file contains:

```json
{
  "version": "6.1.0",
  "label": "tree-shaking",
  "timestamp": "2026-04-13T10:15:00.000Z",
  "iterations": 3,
  "buildTime": {
    "average": 26600,
    "min": 26500,
    "max": 26680,
    "all": [26500, 26680, 26620]
  },
  "bundleSizes": {
    "js": {
      "raw": 6492160,
      "gzipped": 1404928,
      "fileCount": 18,
      "files": [...]
    },
    "css": {
      "raw": 433184,
      "gzipped": 50266,
      "fileCount": 2,
      "files": [...]
    },
    "maps": {
      "raw": 0,
      "fileCount": 0
    },
    "totalFiles": 33
  }
}
```

## Notes

- The script runs **3 build iterations** and reports the average
- `dist/` and `tmp/` directories are cleaned before each build
- Workspace packages are rebuilt automatically if referenced
- Gzip compression uses Node's `zlib.gzipSync` with default settings
