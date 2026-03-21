#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/downloads/DataPet-download"

rm -rf "$OUT_DIR"
mkdir -p "$OUT_DIR"

# Copia del proyecto lista para descargar, sin metadatos de git ni dependencias locales.
tar \
  --exclude='.git' \
  --exclude='downloads' \
  --exclude='backend/node_modules' \
  -cf - -C "$ROOT_DIR" . | tar -xf - -C "$OUT_DIR"

echo "Carpeta generada en: $OUT_DIR"
