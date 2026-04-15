# Security Notes

## Ownership and confidentiality

- This project is proprietary and closed-source. No permission is granted to copy, reuse, or redistribute the code or assets without written approval from the owner.
- Copyright can protect the original code, artwork, writing, and other creative assets in this repository.
- A public frontend cannot keep shipped JavaScript, HTML, CSS, or image assets secret. If part of the project must stay confidential, it should not be committed to or served from a public client.

## Basics

- Keep secrets in a local `.env` file only.
- Never place API keys, tokens, passwords, or private keys in `index.js`, `index.html`, CSS, or any tracked file.
- Frontend code is public to anyone using the site, so real secrets must live on a backend or serverless function.

## Local protection

- This repo includes `.githooks/pre-commit` and `scripts/check-secrets.ps1` to catch common secret patterns before commits.
- Enable the hook once per clone with:

```powershell
git config core.hooksPath .githooks
```

## GitHub protection

- The GitHub Actions workflow at `.github/workflows/secret-scan.yml` scans pushes and pull requests for leaked secrets.
- If this repository is hosted on GitHub, also enable Secret Scanning and Push Protection in repository settings when available.
- If this repository is public and the project is still confidential, make the repository private immediately.
- Limit admin access and require review before merging if other collaborators are added.

## If something leaks

1. Remove the secret from the codebase.
2. Rotate or revoke the credential immediately.
3. If it was committed, remove it from git history before assuming the repo is safe.
