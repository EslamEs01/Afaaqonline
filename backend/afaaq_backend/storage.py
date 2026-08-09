from whitenoise.storage import CompressedManifestStaticFilesStorage


class JazzminManifestStaticFilesStorage(CompressedManifestStaticFilesStorage):
    """Keep Jazzmin's Bootswatch directory URL compatible with strict manifests."""

    def stored_name(self, name: str) -> str:
        if name.rstrip("/") == "vendor/bootswatch":
            return name.rstrip("/")
        return super().stored_name(name)
