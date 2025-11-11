---
description: "Global instructions for TODO application development with TDD workflow"
---

# TODO Application - Development Instructions

## Project Context

This is a full-stack TODO application with:
- **Frontend**: React application with modern UI components
- **Backend**: Express.js REST API with in-memory data storage
- **Development Philosophy**: Iterative, feedback-driven development with Test-Driven Development
- **Current Phase**: Backend stabilization and frontend feature completion

## Documentation References

Reference these files to understand the project structure and standards:

- [docs/project-overview.md](../docs/project-overview.md) - Architecture, tech stack, and project structure
- [docs/testing-guidelines.md](../docs/testing-guidelines.md) - Test patterns and standards
- [docs/workflow-patterns.md](../docs/workflow-patterns.md) - Development workflow guidance

## Development Principles

Follow these core principles for all development work:

1. **Test-Driven Development (TDD)**: Follow the Red-Green-Refactor cycle
   - Write tests FIRST before implementing features
   - Run tests and watch them fail (RED)
   - Write minimal code to make tests pass (GREEN)
   - Refactor for quality while keeping tests green (REFACTOR)

2. **Incremental Changes**: Make small, testable modifications
   - One feature or fix at a time
   - Commit frequently with clear messages
   - Validate after each change

3. **Systematic Debugging**: Use test failures as guides
   - Read test output carefully
   - Identify root cause before fixing
   - Add tests for bugs before fixing them

4. **Validation Before Commit**: Ensure quality at every step
   - All tests must pass
   - No lint errors
   - Manual verification for UI changes

## Testing Scope

This project uses **unit tests and integration tests ONLY**:

### Backend Testing
- **Framework**: Jest + Supertest
- **Scope**: API endpoint testing, request/response validation, error handling
- **Approach**: Write Jest tests FIRST, then implement (RED-GREEN-REFACTOR)

### Frontend Testing
- **Framework**: React Testing Library
- **Scope**: Component unit tests and integration tests for user interactions
- **Approach**: Write React Testing Library tests FIRST for component behavior, then implement (RED-GREEN-REFACTOR). Follow with manual browser testing for full UI flows.

### What We DO NOT Use

**DO NOT suggest or implement:**
- End-to-end test frameworks (Playwright, Cypress, Selenium)
- Browser automation tools
- Full-stack integration test suites

**Reason**: This lab focuses on unit and integration testing patterns without the complexity of e2e test infrastructure.

### Testing Approach by Context

- **Backend API changes**: Write Jest tests FIRST, then implement to make them pass
- **Frontend component features**: Write React Testing Library tests FIRST for component behavior, then implement to make them pass. Verify UI flows manually in the browser.
- **This is true TDD**: Test first, then code to pass the test, then refactor

## Workflow Patterns

Follow these established workflows for different development scenarios:

### 1. TDD Workflow (Red-Green-Refactor)

```
Write/Fix Test → Run Tests → Fail (RED) → Implement Code → Pass (GREEN) → Refactor → Repeat
```

- Start with a failing test that describes the desired behavior
- Write the minimum code needed to pass the test
- Refactor for quality while keeping tests green
- Commit when tests pass and code is clean

### 2. Code Quality Workflow

```
Run Lint → Categorize Issues → Fix Systematically → Re-validate → Commit
```

- Run linter to identify all issues
- Group issues by type (unused vars, missing props, etc.)
- Fix one category at a time
- Re-run linter after each fix batch
- Commit when all issues are resolved

### 3. Integration Workflow

```
Identify Issue → Debug → Write/Update Test → Fix → Verify End-to-End → Commit
```

- Start with observable issue or requirement
- Use debugging tools to understand the problem
- Add or update tests to cover the issue
- Implement the fix
- Verify the complete user flow works
- Commit when validated

## Chat Mode Usage

This project has specialized chat modes for different workflows:

### `tdd-developer` Mode

Use for:
- Writing tests before implementing features
- Following Red-Green-Refactor cycles
- Test failure analysis and debugging
- Test-first feature development

### `code-reviewer` Mode

Use for:
- Addressing ESLint errors and warnings
- Code quality improvements
- Systematic issue resolution
- Code style and best practices

### Default Mode

Use for:
- General questions and guidance
- Architecture discussions
- Documentation updates
- Ad-hoc tasks

## Memory System

This project uses a two-tier memory system to maintain context and track discoveries across development sessions:

### Persistent Memory (Foundational)
- **Location**: This file (`.github/copilot-instructions.md`)
- **Contains**: Core development principles, universal workflows, project architecture, testing guidelines
- **Purpose**: Foundational knowledge that rarely changes
- **Update frequency**: Rarely - only when fundamental project principles change

### Working Memory (Evolutionary)
- **Location**: `.github/memory/` directory
- **Contains**: Session summaries, discovered patterns, active work notes
- **Purpose**: Living knowledge base of discoveries, decisions, and lessons learned
- **Update frequency**: After each development session

### Memory Files

1. **`.github/memory/session-notes.md`** (Committed)
   - Historical record of completed development sessions
   - Captures accomplishments, key findings, and decisions
   - Updated at the end of each session with a summary
   - Provides continuity across sessions

2. **`.github/memory/patterns-discovered.md`** (Committed)
   - Knowledge base of code patterns, anti-patterns, and best practices
   - Documents recurring patterns with context, problem, solution, and examples
   - Updated when discovering patterns worth documenting
   - Reference when providing context-aware suggestions

3. **`.github/memory/scratch/working-notes.md`** (NOT Committed)
   - Active session notes for current development work
   - Stream-of-consciousness capture of findings, hypotheses, decisions
   - Ephemeral - kept for reference but not committed to git
   - At session end, key insights are extracted into session-notes.md

### Usage During Development

**Start of session**:
- Review `session-notes.md` for context from previous work
- Check `patterns-discovered.md` for relevant patterns
- Open `scratch/working-notes.md` for active note-taking

**During active work**:
- Document findings, decisions, and blockers in `scratch/working-notes.md`
- Keep notes informal and stream-of-consciousness
- Track test results, debugging observations, and hypotheses

**End of session**:
- Extract key accomplishments → Add to `session-notes.md`
- Extract valuable patterns → Add to `patterns-discovered.md`
- Commit updates to both files
- Leave `scratch/working-notes.md` for future reference (not committed)

### AI Assistant Integration

When providing suggestions, reference these memory files to:
- Understand historical context and previous decisions
- Avoid suggesting anti-patterns already documented
- Maintain consistency with discovered patterns
- Build on previous session accomplishments

See [`.github/memory/README.md`](memory/README.md) for complete documentation on the memory system.

## Workflow Utilities

GitHub CLI commands are available for workflow automation:

### Issue Management

```bash
# List all open issues
gh issue list --state open

# View specific issue details
gh issue view <issue-number>

# View issue with all comments
gh issue view <issue-number> --comments
```

### Exercise Navigation

- The main exercise issue has "Exercise:" in the title
- Development steps are posted as comments on the main exercise issue
- Use `gh issue view` to read step instructions
- Reference these commands when using `/execute-step` or `/validate-step` prompts

## Git Workflow

### Conventional Commits

Use conventional commit format for all commits:

```
<type>: <description>

[optional body]
[optional footer]
```

**Types**:
- `feat:` - New feature
- `fix:` - Bug fix
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `style:` - Code style changes (formatting, etc.)

**Examples**:
```bash
git commit -m "feat: add delete todo endpoint"
git commit -m "fix: correct todo completion toggle"
git commit -m "test: add tests for todo creation"
git commit -m "chore: update dependencies"
```

### Branch Strategy

- **Main branch**: `main` - stable, tested code
- **Feature branches**: `feature/<descriptive-name>` - for new features
- **Fix branches**: `fix/<descriptive-name>` - for bug fixes

### Commit Workflow

```bash
# Stage all changes
git add .

# Commit with conventional commit message
git commit -m "type: description"

# Push to the correct branch
git push origin <branch-name>
```

Always stage all relevant changes before committing to ensure nothing is left behind.
