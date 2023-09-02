// import { uid } from './uid.js'

export enum StatusNames {
  Capture  = 'Capture',
  Draft    = 'Draft',
  Rework   = 'Rework',
  Clarify  = 'Clarify',
  Incubate = 'Incubate',
  Backlog  = 'Backlog',
  Icebox   = 'Icebox',

  Ready    = 'Ready',
  Next     = 'Next',
  Started  = 'Started',
  Check    = 'Check',
  Done     = 'Done',
  Reflect  = 'Reflect',

  Stalled  = 'Stalled',
  Aborted  = 'Aborted',
  Archive  = 'Archive',
  Deleted  = 'Deleted',
}

export enum EntryTypes {
  Transient = 'Transient',
  Note      = 'Note',
  Area      = 'Area',
  Objective = 'Objective',
  Project   = 'Project',
  Task      = 'Task',
}

export enum Priority {
  NONE = 0,
  LOW  = 1,
  MED  = 2, 
  HIGH = 3,
  VERY = 4,
  MAX  = 5
}

