# AGENTS.md

This file provides instructions for agents working on this repository.

## General Rules

- **Always pull before starting work.** When there are no local changes yet and you are about to start making changes, run `git pull` first to ensure you are up to date with the remote.
- **Never commit or push without explicit user instruction.** Always wait for the user to ask before running `git commit` or `git push`, even if changes are ready and a message is prepared.
- **Always confirm before committing.** When the user asks to commit, first show the proposed commit message and the list of changed files, then ask for confirmation before running `git commit`.

## Git Conventions

### Conventional Commits

All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <description>

[optional body]
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (formatting, semi-colons, etc.)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding or correcting tests
- `build`: Changes that affect the build system or external dependencies
- `chore`: Other changes that don't modify src or test files

**Examples:**
```
feat: add support for text alignment
```

### Gitflow

This project follows [Gitflow](https://nvie.com/posts/a-successful-git-branching-model/), also including conventional commit types as branch prefixes.

**Branch types:**
- `master`: Production branch — merging here automatically triggers a release via the CI workflow
- `feat/<description>`: New features (branch from `master`)
- `fix/<description>`: Bug fixes (branch from `master`)
- `docs/<description>`: Documentation changes (branch from `master`)
- `chore/<description>`: Maintenance tasks (branch from `master`)
- ...

**All work must be done on a dedicated branch, never directly on `master`.** Merging into `master` is the release trigger — only do so when the changes are ready to be released.

**Never run `pnpm release` manually.** The CI handles versioning, changelog generation, tagging, and publishing automatically on every merge to `master`.
