#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_ROOT="${AFQ_PROJECT_ROOT:-/var/www/afaaqinstitute}"
BACKEND_ROOT="$PROJECT_ROOT/backend"

if [[ ! -f "$PROJECT_ROOT/package.json" || ! -f "$BACKEND_ROOT/manage.py" ]]; then
  echo "Afaaq project was not found at: $PROJECT_ROOT" >&2
  exit 1
fi

if [[ ! -f "$PROJECT_ROOT/.env" || ! -f "$BACKEND_ROOT/.env" ]]; then
  echo "Create .env and backend/.env from their example files before deployment." >&2
  exit 1
fi

cd "$PROJECT_ROOT"

if [[ "${AFQ_SKIP_PULL:-false}" != "true" ]]; then
  git pull --ff-only origin main
fi

npm ci
npm run build

python3 -m venv "$BACKEND_ROOT/.venv"
"$BACKEND_ROOT/.venv/bin/pip" install --disable-pip-version-check -r "$BACKEND_ROOT/requirements.lock.txt"

set -a
source "$BACKEND_ROOT/.env"
set +a

"$BACKEND_ROOT/.venv/bin/python" "$BACKEND_ROOT/manage.py" check --deploy
"$BACKEND_ROOT/.venv/bin/python" "$BACKEND_ROOT/manage.py" makemigrations --check --dry-run
"$BACKEND_ROOT/.venv/bin/python" "$BACKEND_ROOT/manage.py" migrate --noinput
"$BACKEND_ROOT/.venv/bin/python" "$BACKEND_ROOT/manage.py" seed_afaaq
"$BACKEND_ROOT/.venv/bin/python" "$BACKEND_ROOT/manage.py" collectstatic --noinput

if [[ "${AFQ_SKIP_RESTART:-false}" != "true" ]]; then
  systemctl restart afaaqinstitute-backend.service afaaqinstitute-frontend.service
  systemctl --no-pager --full status afaaqinstitute-backend.service afaaqinstitute-frontend.service
fi

echo "Afaaq application update completed; external verification is still required."
