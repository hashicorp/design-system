#!/bin/bash
# Restore the full showcase app after benchmarking

set -e

cd "$(dirname "$0")"

if [ ! -d ".benchmark-backup" ]; then
  echo "❌ No backup found. Run 'git checkout app/router.ts app/templates/' to restore."
  exit 1
fi

echo "Restoring full showcase..."

cp .benchmark-backup/router.ts app/router.ts
cp .benchmark-backup/application.gts app/templates/application.gts
cp .benchmark-backup/index.gts app/templates/index.gts

rm -rf .benchmark-backup

echo "✅ Full showcase restored!"
