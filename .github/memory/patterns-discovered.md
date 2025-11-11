# Patterns Discovered

## Purpose

Document recurring code patterns, anti-patterns, and best practices discovered during development. This serves as a knowledge base for maintaining consistency and avoiding known pitfalls.

---

## Pattern Template

```markdown
## Pattern: [Pattern Name]

**Context**: [When/where this pattern applies]

**Problem**: [What problem does this solve?]

**Solution**: [How to implement this pattern]

**Example**:
```javascript
// Code example demonstrating the pattern
```

**Related Files**: [Files where this pattern is used or relevant]

**Notes**: [Additional considerations, gotchas, alternatives]

---
```

## Example Pattern

---

## Pattern: Service Initialization - Empty Array vs Null

**Context**: Express.js REST API with in-memory data storage

**Problem**: Routes and middleware need access to data structures, but if those structures are undefined or initialized after route definitions, operations will fail with "Cannot read property of undefined" errors.

**Solution**: Initialize all in-memory data structures (arrays, objects, counters) **before** defining any routes or middleware that depend on them.

**Example**:
```javascript
const express = require('express');
const app = express();

// ✅ CORRECT: Initialize data structures FIRST
let todos = [];
let nextId = 1;

// ✅ THEN define middleware
app.use(express.json());

// ✅ THEN define routes that use the data
app.get('/api/todos', (req, res) => {
  res.json(todos); // 'todos' is guaranteed to exist
});

app.post('/api/todos', (req, res) => {
  const todo = {
    id: nextId++,
    title: req.body.title,
    completed: false,
    createdAt: new Date().toISOString()
  };
  todos.push(todo);
  res.status(201).json(todo);
});

// ❌ WRONG: Initializing after routes
// let todos = []; // Too late! Routes above will fail
```

**Related Files**: 
- `packages/backend/src/app.js` (main application file)
- `packages/backend/__tests__/app.test.js` (tests expecting this behavior)

**Notes**: 
- This is specific to in-memory storage. With databases, connection initialization order matters instead.
- JavaScript hoisting doesn't help here because routes are executed at runtime, not parse time.
- Pattern applies to any stateful service initialization (counters, caches, configuration objects).

---

## Future Patterns

Add new patterns below as you discover them during development. Keep entries focused and actionable.
