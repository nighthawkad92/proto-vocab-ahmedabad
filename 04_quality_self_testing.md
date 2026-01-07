# Quality, Security & Self-Testing Instructions

## Claude Responsibilities
Claude should:
- Review its own code for:
  - security issues
  - performance bottlenecks
  - UI clarity for children
- Refactor unclear components
- Simplify overly complex logic
- Ensure no sensitive data leaks

## Required Self-Tests
- Can a student refresh mid-lesson?
- Does offline mode still save progress?
- Are lesson unlocks enforced correctly?
- Can one teacher access another class? (should fail)
- Does UI work with touch only?

## Quality Bar
- Large tap targets
- No tiny text
- Clear progress feedback
- Graceful failure on network loss