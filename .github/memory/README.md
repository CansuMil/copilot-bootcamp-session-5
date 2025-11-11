# Working Memory System

## Purpose

This memory system helps track patterns, decisions, and lessons learned during development. It serves as a **living knowledge base** that both developers and AI assistants can reference to maintain context across sessions and make better-informed decisions.

## Why Use a Memory System?

During iterative development with AI assistance, you'll discover:
- **Patterns** that work well (or don't work) for this specific codebase
- **Decisions** about why certain approaches were chosen
- **Gotchas** and edge cases specific to your tech stack
- **Context** that helps future work align with past learnings

Without documentation, these insights are lost when a session ends or context window clears.

## Two Types of Memory

### Persistent Memory (Foundational)
**Location**: `.github/copilot-instructions.md`

Contains:
- Core development principles (TDD, incremental changes)
- Universal workflows (Red-Green-Refactor)
- Project architecture and standards
- Testing guidelines

**When to update**: Rarely. Only when fundamental project principles change.

### Working Memory (Evolutionary)
**Location**: `.github/memory/`

Contains:
- Session summaries of completed work
- Discovered code patterns and anti-patterns
- Active session notes (temporary)
- Lessons learned from debugging

**When to update**: Frequently. After each session or when discovering new patterns.

## Directory Structure

```
.github/memory/
├── README.md                    # This file - explains the system
├── session-notes.md             # Historical summaries (COMMITTED)
├── patterns-discovered.md       # Accumulated patterns (COMMITTED)
└── scratch/
    ├── .gitignore              # Ignores all files in scratch/
    └── working-notes.md        # Active session notes (NOT COMMITTED)
```

### File Purposes

#### `session-notes.md` (Historical Record)
- **Purpose**: Document completed sessions for future reference
- **Status**: Committed to git
- **Content**: Summaries of what was accomplished, key findings, decisions made
- **When to update**: At the end of each development session
- **Format**: Chronological entries with date, goals, outcomes

#### `patterns-discovered.md` (Knowledge Base)
- **Purpose**: Document recurring code patterns, anti-patterns, and best practices
- **Status**: Committed to git
- **Content**: Pattern templates with context, problem, solution, examples
- **When to update**: When you discover a pattern worth documenting
- **Format**: Structured entries with name, context, problem, solution, example code

#### `scratch/working-notes.md` (Active Work)
- **Purpose**: Capture thoughts, decisions, and findings during active development
- **Status**: NOT committed (ignored by git)
- **Content**: Current task, approach, findings, blockers, next steps
- **When to update**: Throughout active development session
- **Format**: Free-form notes organized by current task

## When to Use Each File

### During TDD Workflow

**Before starting**:
1. Review `session-notes.md` for context from previous sessions
2. Check `patterns-discovered.md` for relevant patterns
3. Open `scratch/working-notes.md` for active note-taking

**While working (Red-Green-Refactor)**:
1. Document test failures and hypotheses in `scratch/working-notes.md`
2. Note which approaches worked/failed
3. Record any surprises or unexpected behaviors

**After completing feature**:
1. If you discovered a new pattern → Add to `patterns-discovered.md`
2. Summarize session accomplishments → Add to `session-notes.md`
3. Leave `scratch/working-notes.md` for future reference (not committed)

### During Lint Error Resolution

**Active work**:
1. Document error categories in `scratch/working-notes.md`
2. Note systematic fixes that work well
3. Track which ESLint rules are most problematic

**After resolution**:
1. If a lint pattern keeps recurring → Document in `patterns-discovered.md`
2. Summarize lint fixes in `session-notes.md` if significant

### During Debugging

**Active debugging**:
1. Document symptoms, hypotheses, and tests in `scratch/working-notes.md`
2. Track what you've tried and results
3. Note breakthrough moments

**After fix**:
1. Document root cause and solution in `patterns-discovered.md` if it's a valuable lesson
2. Add to `session-notes.md` if it was a significant bug
3. Include the bug pattern to avoid in future

### During Integration Testing

**Active testing**:
1. Document test scenarios in `scratch/working-notes.md`
2. Note unexpected behaviors
3. Track which integration points are fragile

**After testing**:
1. Document common integration patterns in `patterns-discovered.md`
2. Summarize integration issues found/fixed in `session-notes.md`

## How AI Reads and Applies These Patterns

When you provide context to GitHub Copilot by referencing these files:

1. **AI reads historical context**: Understanding what's been tried, what worked, what failed
2. **AI avoids known pitfalls**: Won't suggest anti-patterns you've already documented
3. **AI suggests aligned solutions**: Recommendations consistent with discovered patterns
4. **AI maintains continuity**: Picks up where previous sessions left off

### Example AI Workflow

```
You: "I need to add a new API endpoint. Check memory for relevant patterns."

AI: [Reads patterns-discovered.md]
    "Based on your 'Service Initialization' pattern, I'll ensure the
    data structure is initialized before the endpoint definition.
    From session-notes.md, I see you've been following the POST
    endpoint pattern with validation. I'll apply the same structure."
```

## Workflow: Active Session → Historical Record

### Start of Session
1. Create or update `scratch/working-notes.md` with current task
2. Review `session-notes.md` and `patterns-discovered.md` for context

### During Session
- Add findings, decisions, and notes to `scratch/working-notes.md`
- Keep it informal and stream-of-consciousness
- Don't worry about formatting

### End of Session
1. Review `scratch/working-notes.md`
2. Extract key accomplishments → Add to `session-notes.md`
3. Extract valuable patterns → Add to `patterns-discovered.md`
4. Leave `scratch/working-notes.md` as-is (not committed, but available for reference)
5. Commit updates to `session-notes.md` and `patterns-discovered.md`

### Why This Split?

- **Committed files** (`session-notes.md`, `patterns-discovered.md`): Curated, valuable historical knowledge
- **Scratch files** (`working-notes.md`): Raw, unfiltered active work notes
- **Benefit**: Freedom to take messy notes without cluttering git history, while preserving polished learnings

## Best Practices

### 1. Be Specific
❌ "Fixed bug"  
✅ "Fixed toggle bug: was always setting completed=true instead of toggling. Root cause: hardcoded boolean instead of using !todo.completed"

### 2. Include Context
❌ "Added validation"  
✅ "Added title validation to POST /api/todos. Returns 400 if title is missing or empty string. Required by test suite."

### 3. Document Why, Not Just What
❌ "Changed initialization order"  
✅ "Moved todos array initialization before route definitions because Express middleware needs data structure to exist. Learned: initialization order matters for in-memory storage."

### 4. Link to Code
When documenting patterns, reference actual files:
```
Pattern: Service Initialization
Files: packages/backend/src/app.js (lines 10-15)
```

### 5. Use Templates Consistently
Follow the templates in `session-notes.md` and `patterns-discovered.md` for consistency.

## Example: Complete TDD Session

**Beginning** (Review context):
- Read `session-notes.md`: "Last session implemented POST endpoint"
- Check `patterns-discovered.md`: "Service initialization pattern documented"
- Open `scratch/working-notes.md`: Start new task section

**During** (Active work):
```markdown
## Current Task: Implement DELETE endpoint

### Approach
- Following TDD: Write test first, then implement
- Test file: app.test.js line 120

### Key Findings
- Need to handle non-existent ID (404)
- Array.splice() vs Array.filter() - using filter for immutability

### Decisions Made
- Return 404 with error message (consistent with other endpoints)
- Use findIndex + splice instead of filter to mutate in-place
```

**End** (Summarize):

Add to `session-notes.md`:
```markdown
## Session: Implement DELETE endpoint - Nov 11, 2025

### Accomplished
- Implemented DELETE /api/todos/:id endpoint
- Added 404 handling for non-existent todos
- All tests passing

### Key Findings
- Array.splice() is appropriate for in-memory storage (no persistence concerns)
- Consistent error handling: 404 with {error: "message"} format

### Outcomes
- DELETE endpoint complete and tested
- Ready for frontend integration
```

Add to `patterns-discovered.md` (if new pattern discovered):
```markdown
## Pattern: DELETE Endpoint Error Handling

**Context**: REST API with in-memory storage

**Problem**: Need to handle DELETE requests for non-existent resources

**Solution**: 
- Find item by ID using findIndex()
- Return 404 if not found before attempting deletion
- Use splice() to remove from array

**Example**: See packages/backend/src/app.js, DELETE /api/todos/:id

**Related Files**: app.test.js (DELETE endpoint tests)
```

## Getting Started

1. **First Session**: Create initial entry in `session-notes.md` documenting current state
2. **Active Work**: Use `scratch/working-notes.md` for all active note-taking
3. **Discovery**: When you learn something valuable, add to `patterns-discovered.md`
4. **End Session**: Summarize into `session-notes.md`, commit both files

## Questions?

This system is meant to be **helpful, not burdensome**. Adapt it to your workflow:
- Take quick notes during work
- Polish them at session end
- Don't over-document trivial changes
- Focus on learnings that will help future work

The goal: **Make your future self and AI assistant smarter by preserving context and discoveries.**
