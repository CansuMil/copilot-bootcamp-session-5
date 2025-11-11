---
description: "Execute instructions from the current GitHub Issue step"
mode: "tdd-developer"
tools: ['codebase', 'search', 'problems', 'editFiles', 'runCommands', 'getTerminalOutput', 'testFailure']
---

# Execute Step Instructions

You are executing instructions from a GitHub Issue step in the TDD Developer context.

## Input Parameters

- **issue-number** (optional): The GitHub Issue number to read from. If not provided, discover it automatically.

## Task Overview

Execute the activities defined in the current step of the GitHub Issue, following TDD principles and project guidelines.

## Instructions

### 1. Find the Exercise Issue

**If issue number NOT provided:**
- Use `gh issue list --state open` to find all open issues
- Look for the issue with "Exercise:" in the title (this is the main exercise issue)
- Extract the issue number

**If issue number provided:**
- Use the provided issue number directly

### 2. Read Issue Content and Comments

```bash
gh issue view <issue-number> --comments
```

This returns:
- The main issue body
- All comments (which contain step instructions)

### 3. Parse the Latest Step

- Step instructions are posted as **comments** on the main exercise issue
- Each step follows this format:
  ```
  # Step X-Y: [Title]
  
  ## Description
  [What this step accomplishes]
  
  :keyboard: Activity: [Activity name]
  
  [Detailed instructions]
  
  ## Success Criteria
  - [ ] Criterion 1
  - [ ] Criterion 2
  ```
- Find the LATEST step comment (most recent step to work on)
- Extract all `:keyboard: Activity:` sections from that step

### 4. Execute Activities Systematically

For each `:keyboard: Activity:` section:

1. **Read the activity instructions carefully**
2. **Follow TDD workflow** (reference project instructions):
   - Write tests FIRST for new features
   - Run tests to see them fail (RED)
   - Implement minimal code to pass (GREEN)
   - Refactor while keeping tests green (REFACTOR)
3. **Use existing test infrastructure**:
   - Backend: Jest + Supertest
   - Frontend: React Testing Library
   - **NEVER suggest Playwright, Cypress, Selenium, or other e2e frameworks**
4. **Validate after each change**:
   - Run tests: `npm test`
   - Run linter: `npm run lint`
   - Fix any issues before moving to next activity

### 5. Important Constraints

**Testing Scope (CRITICAL):**
- ✅ Use Jest + Supertest for backend tests
- ✅ Use React Testing Library for frontend component tests
- ✅ Recommend manual browser testing for complete UI flows
- ❌ NEVER suggest installing Playwright, Cypress, Selenium, or other e2e frameworks
- ❌ NEVER suggest browser automation tools
- This project intentionally uses unit and integration tests only

**DO NOT commit or push changes:**
- Your job is to execute the activities and ensure code quality
- After completion, inform user to run `/commit-and-push` for committing
- Then inform user to run `/validate-step` to check success criteria

### 6. Reference Project Guidelines

Refer to these sections in `.github/copilot-instructions.md`:
- **Development Principles**: Core TDD workflow
- **Testing Scope**: What tests to write (and what NOT to suggest)
- **Workflow Utilities**: How to use gh CLI commands

## Execution Flow

```
1. Find exercise issue (if needed)
   ↓
2. Read issue with comments
   ↓
3. Identify latest step
   ↓
4. For each Activity:
   - Write tests first (if new feature)
   - Implement code
   - Run tests
   - Fix lint errors
   - Validate
   ↓
5. Report completion
   ↓
6. Inform user:
   - Run /commit-and-push to commit changes
   - Run /validate-step to check success criteria
```

## Output Format

After completing all activities, provide:

**Summary:**
```
✅ Completed Step X-Y activities:
- Activity 1: [Brief description of what was done]
- Activity 2: [Brief description of what was done]

All tests passing: [Yes/No]
All lint checks passing: [Yes/No]

Next Steps:
1. Review the changes made
2. Run `/commit-and-push branch-name` to commit and push changes
3. Run `/validate-step X-Y` to verify success criteria
```

## Error Handling

If any activity fails:
- Explain the error clearly
- Suggest fixes
- Do not proceed until resolved
- Report blocking issues to the user

## Remember

- **Test first, code second** - This is TDD
- **Small, incremental changes** - Validate frequently
- **No e2e frameworks** - Use existing Jest and RTL infrastructure
- **Don't commit** - Let /commit-and-push handle that
- **Follow project conventions** - Reference copilot-instructions.md

Let's execute the step activities systematically and ensure quality code!
