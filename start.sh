#!/usr/bin/env bash
# Start a local web server for the NAMO Hospital website.
# Usage: ./start.sh   then open http://localhost:8080 in Chrome.

set -e
cd "$(dirname "$0")"

PORT=8080

echo "Serving NAMO Hospital website on http://localhost:${PORT}"
echo "Open that URL in Chrome. Press Ctrl+C to stop."
echo

# Prefer python3; fall back to python.
if command -v python3 >/dev/null 2>&1; then
    exec python3 -m http.server "${PORT}"
elif command -v python >/dev/null 2>&1; then
    exec python -m http.server "${PORT}"
else
    echo "Python not found. Install python3, or run: npx serve ."
    exit 1
fi
