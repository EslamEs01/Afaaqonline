#!/usr/bin/env bash
set -Eeuo pipefail

backup_dir=/var/backups/afaaqinstitute
database=afaaqinstitute
timestamp="$(date -u +%Y%m%dT%H%M%SZ)"
archive="${backup_dir}/${database}-${timestamp}.dump"

umask 077
install -d -m 0700 -o root -g root "${backup_dir}"
runuser -u postgres -- pg_dump --format=custom --compress=9 "${database}" > "${archive}"
chmod 0600 "${archive}"
test -s "${archive}"
find "${backup_dir}" -maxdepth 1 -type f -name 'afaaqinstitute-*.dump' -mtime +6 -delete
