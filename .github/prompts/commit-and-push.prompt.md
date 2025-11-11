---
description: "Analyze changes, generate commit message, and push to feature branch"
tools: ['runCommands', 'getTerminalOutput']
---

# Commit and Push Changes

You are preparing to commit and push changes to a feature branch using conventional commit format.

## Input Parameters

- **branch-name** (REQUIRED): The name of the feature branch to commit and push to

**If branch name is not provided, ask the user for it.**

## Task Overview

Analyze current changes, generate an appropriate conventional commit message, and push to the specified feature branch.

## Instructions

### 1. Verify Branch Name

**CRITICAL**: The branch name MUST be provided by the user.

If not provided:
```
I need a branch name to commit and push changes. 

Please provide a branch name following the project's branch strategy:
- Feature branches: feature/<descriptive-name>
- Fix branches: fix/<descriptive-name>

Example: feature/implement-delete-endpoint

What branch name would you like to use?
```

### 2. Analyze Changes

Run git diff to understand what has changed:

```bash
git diff
```

Analyze:
- Which files were modified?
- What functionality was added/changed/fixed?
- Are changes focused on one concern or multiple?

### 3. Generate Conventional Commit Message

Follow the **Conventional Commits** format from project guidelines:

```
<type>: <description>

[optional body]
[optional footer]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `style:` - Code style changes (formatting, etc.)

**Examples:**
```
feat: add delete todo endpoint
fix: correct todo completion toggle
test: add tests for todo creation
chore: update dependencies
```

**Guidelines:**
- Keep description concise (50-72 chars)
- Use imperative mood ("add" not "added")
- Don't capitalize first letter after type
- No period at the end

### 4. Create or Switch to Branch

**Check if branch exists:**
```bash
git branch --list ${branch-name}
```

**If branch does NOT exist:**
```bash
git checkout -b ${branch-name}
```

**If branch EXISTS:**
```bash
git checkout ${branch-name}
```

### 5. Stage All Changes

```bash
git add .
```

This stages all modified, new, and deleted files.

### 6. Commit with Generated Message

```bash
git commit -m "<generated-message>"
```

### 7. Push to Remote

```bash
git push origin ${branch-name}
```

**If this is the first push for a new branch:**
```bash
git push -u origin ${branch-name}
```

## Important Constraints

**NEVER commit to main:**
- ONLY use the branch name provided by the user
- Do not commit directly to `main` or any other branch
- Always create/use the specified feature or fix branch

**Stage all changes:**
- Use `git add .` to ensure nothing is left behind
- This is the project's standard practice

## Execution Flow

```
1. Verify branch-name provided
   ↓
2. Analyze changes (git diff)
   ↓
3. Generate conventional commit message
   ↓
4. Create or switch to branch
   ↓
5. Stage all changes (git add .)
   ↓
6. Commit with message
   ↓
7. Push to origin
   ↓
8. Report success
```

## Output Format

After successful commit and push:

```
✅ Changes committed and pushed successfully!

Branch: ${branch-name}
Commit message: ${commit-message}

Files changed: [list of changed files]

Next steps:
- If working on a GitHub Issue step, run `/validate-step X-Y` to verify completion
- If ready for review, create a Pull Request on GitHub
```

## Error Handling

### If git diff shows no changes:
```
⚠️ No changes detected to commit.

Run `git status` to check your working directory.
Have you made and saved your changes?
```

### If push fails (e.g., conflicts):
```
❌ Push failed: [error message]

Possible issues:
- Remote branch has changes you don't have locally
- Need to pull and merge first: git pull origin ${branch-name}

Please resolve conflicts and try again.
```

### If branch name is invalid:
```
❌ Invalid branch name: ${branch-name}

Branch names should:
- Use lowercase with hyphens
- Follow pattern: feature/<name> or fix/<name>
- Example: feature/add-delete-endpoint

Please provide a valid branch name.
```

## Reference

For more details on the Git workflow, see:
- `.github/copilot-instructions.md` - Git Workflow section
- Conventional Commits specification

Let's commit and push your changes with a clear, descriptive message!
