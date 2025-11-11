---
description: "Validate that all success criteria for the current step are met"
mode: "code-reviewer"
tools: ['codebase', 'problems', 'runCommands', 'getTerminalOutput']
---

# Validate Step Success Criteria

You are validating that all success criteria for a specific GitHub Issue step are met, using code review and quality checking skills.

## Input Parameters

- **step-number** (REQUIRED): The step number to validate (e.g., "5-0", "5-1", "5-2")

**The step number MUST be provided. If not provided, ask the user for it.**

## Task Overview

Check each success criterion from the specified GitHub Issue step and provide a detailed validation report.

## Instructions

### 1. Verify Step Number

**CRITICAL**: The step number MUST be provided.

If not provided:
```
I need a step number to validate.

Please provide the step number in the format shown in the GitHub Issue.
Examples: "5-0", "5-1", "5-2"

What step would you like me to validate?
```

### 2. Find the Main Exercise Issue

Use gh CLI to find the exercise issue:

```bash
gh issue list --state open
```

Look for the issue with "Exercise:" in the title. This is the main exercise issue.

### 3. Read Issue with Comments

```bash
gh issue view <issue-number> --comments
```

This returns the issue body and all comments containing step instructions.

### 4. Locate the Specific Step

Search through the issue comments to find:

```
# Step ${step-number}: [Title]
```

Example: If validating step "5-1", search for "# Step 5-1:"

### 5. Extract Success Criteria

From the located step, find the "Success Criteria" section:

```
## Success Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

Extract all criteria listed.

### 6. Validate Each Criterion

For each criterion, check the workspace state:

**Example validations:**
- "All backend tests pass" → Run `npm test` in backend
- "No ESLint errors" → Run `npm run lint`
- "POST endpoint returns 201" → Check test output or run tests
- "Delete button removes todo" → Review code implementation
- "Frontend displays todos" → Check component code

**Use these tools:**
- `runCommands` - Run tests, linters, check file contents
- `getTerminalOutput` - Read command results
- `problems` - Check for compilation/lint errors
- `codebase` - Analyze code structure and implementation

### 7. Generate Validation Report

For each criterion, report:
- ✅ **Passing**: Criterion is fully met
- ⚠️ **Partial**: Criterion is partially met, with details
- ❌ **Failing**: Criterion is not met, with specific issues

## Validation Categories

### Test Validation
```bash
# Backend tests
cd packages/backend && npm test

# Frontend tests
cd packages/frontend && npm test

# All tests (from root)
npm test
```

Check for:
- All tests passing
- No test failures or errors
- Correct test coverage for new features

### Lint Validation
```bash
# Backend lint
cd packages/backend && npm run lint

# Frontend lint
cd packages/frontend && npm run lint

# All lint (from root)
npm run lint
```

Check for:
- No ESLint errors
- No ESLint warnings (if criterion specifies)
- Code follows project conventions

### Implementation Validation

Check code for:
- Required functions/endpoints implemented
- Proper error handling
- Following TDD patterns
- Using existing test infrastructure (no e2e frameworks)

### Integration Validation

Verify:
- Features work end-to-end
- API endpoints return correct status codes
- Frontend components render correctly
- Data flows properly between frontend and backend

## Output Format

Provide a detailed validation report:

```
# Validation Report: Step ${step-number}

## Summary
✅ X of Y criteria met
⚠️ Y criteria partially met
❌ Z criteria not met

## Detailed Results

### ✅ Criterion 1: [Description]
**Status**: Passing
**Evidence**: [What was checked and confirmed]

### ⚠️ Criterion 2: [Description]
**Status**: Partial
**Issue**: [What's incomplete or needs attention]
**Recommendation**: [How to fully satisfy this criterion]

### ❌ Criterion 3: [Description]
**Status**: Failing
**Issue**: [Specific problem found]
**Action Required**: [Steps to fix]

## Overall Status

[If all passing:]
🎉 All success criteria met! This step is complete.

[If some failing:]
⚠️ Step incomplete. Address the failing criteria above and re-validate.

[If blocked:]
🚫 Unable to validate some criteria. [Explanation of blocking issues]

## Next Steps
[Guidance on what to do next based on validation results]
```

## Example Validation Scenarios

### Scenario 1: All Tests Pass
```
### ✅ All backend tests pass
**Status**: Passing
**Evidence**: Ran `npm test` in packages/backend - 15/15 tests passing
```

### Scenario 2: Lint Errors Found
```
### ❌ No ESLint errors in frontend
**Status**: Failing
**Issue**: Found 3 ESLint errors in src/App.js:
  - Line 42: 'error' is assigned but never used
  - Line 67: Unexpected console statement
  - Line 89: React Hook useEffect has missing dependency

**Action Required**: 
1. Fix unused variable on line 42
2. Remove or replace console.log on line 67
3. Add missing dependency to useEffect on line 89

Run: npm run lint -- --fix (to auto-fix some issues)
```

### Scenario 3: Implementation Incomplete
```
### ⚠️ DELETE endpoint returns 200 on success
**Status**: Partial
**Issue**: DELETE endpoint is implemented and returns 200, but doesn't handle 
the case where todo ID doesn't exist (should return 404).

**Recommendation**: Add 404 handling:
- Check if todo exists before deletion
- Return 404 with error message if not found
- Add test case for non-existent ID
```

## Error Handling

### If issue or step not found:
```
❌ Could not find step ${step-number} in the GitHub Issue.

Verified:
- Main exercise issue found: Issue number [X]
- Searched all comments for "# Step ${step-number}:"
- No matching step found

Please verify the step number and try again.
Available steps: [list found steps]
```

### If unable to validate criterion:
```
⚠️ Unable to validate: [Criterion description]
**Reason**: [Why validation couldn't be performed]
**Manual check needed**: [What user should verify manually]
```

## Remember

- Be thorough and systematic
- Provide specific evidence for each criterion
- Give actionable guidance for failures
- Use code reviewer perspective for quality checks
- Reference project guidelines and conventions

Let's validate the step completion thoroughly!
