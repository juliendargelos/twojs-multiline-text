# AGENTS.md

This file provides instructions for agents working on this repository.

## General Rules

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
- `main`: Production branch
- `feat/<description>`: New features (branch from `develop`)
- `fix/<description>`: Bug fixes (branch from `develop`)
- `docs/<description>`: Bug fixes (branch from `develop`)
- `style/<description>`: Hotfixes (branch from `main`)
- ...
