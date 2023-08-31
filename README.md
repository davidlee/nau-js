# 🧰 EXEC: project-oriented task and attention management

## philosophy

- UX designed to minimise friction for power users
- Maximise expressive power through careful choice and combination of simple
components
- Be fast.
- Be simple.
- Everything is an entry
- Nondestructive / event-oriented data
- Plugin system: users can extend with JS / TS; user definitions are as powerful as built ins
- Aggressive separation of concerns. CLI, TUI, web front ends. 
- Aspirational: Support for multiple datastore adapters.
  - Local JSON file storage: 
    + easy cross-device sync / interop
    - performance may be problematic
    - algorithmic complexity
      - validation, retrieval, conversion
      - filtering and object hydration
      - tree stuctures
    + flexibility
  - SQLite 
    + performance(!)
    + portability
    + application complexity
    - no JSON support in Prisma
    - file sync 
  - Postgres
    + it's Postgres
    + performance, features & stability
    + JSON support in Prisma
    - portability
    - installation complexity
    - interop with file-based sync
    + cloud deployment
  - Prisma
    + design sucks less than ActiveRecord (the lib & pattern)
    + nice provider of validation & safety
    + Supports Postgres
    + Supports mySQL
      - but not JSON columns
    ? may not (natively) support recursive structures

# TODO

filters
  tags
    groups -> tag[]

command -> interactive? -> confirmation(command)

## Diagrams

[dependencies](./doc/graph.svg)
