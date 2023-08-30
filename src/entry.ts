import { Type, Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { randomUUID } from 'crypto'

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

export const Default = {
  date: () => new Date,
  id:    1,
  path: '/',
  uid:  () => randomUUID().slice(0,8)
}

// TODO
// define:
// TAG
// REFERENCE
// UID
// PATH
// URI
// DATE(fmt)

// EntryUpdate (compose)

export const Entry = Type.Object({
  id:        Type.Number(), // READ nextID()
  uid:       Type.String(), // uid()
  path:      Type.String(), // path(parent?)

  type:      Type.String({ default: EntryTypes.Transient }),
  status:    Type.String({ default: StatusNames.Capture }),
  position:  Type.Number({ default: 1}),

  text:      Type.String(),
  uri:       Type.Optional(Type.String()),

  tags:      Type.Array(Type.String(), { default: [] }), // TODO
  meta:      Type.Array(Type.String(), { default: [] }), // TODO

  priority:  Type.Optional(Type.Enum(Priority)),

  // urgency -- compute at runtime
  // urgency:   Type.Optional(Type.Number({ default: 1.0 })),

  depends:   Type.Array(Type.String(), { default: [] }), // TODO
  parents:   Type.Array(Type.String(), { default: [] }), // TODO
  // children:  Type.Array(Type.String(), { default: [] }), // TODO

  recur:     Type.Array(Type.String(), { default: [] }), // TODO
  repeat:    Type.Array(Type.String(), { default: [] }), // TODO
  review:    Type.Array(Type.String(), { default: [] }), // TODO

  // when now > cron, needs processing for recurrence etc
  cron:      Type.Optional(Type.Date()), 
  
  due:       Type.Optional(Type.Date()),  
  end:       Type.Optional(Type.Date()),  
  scheduled: Type.Optional(Type.Date()),  
  until:     Type.Optional(Type.Date()),  
  wait:      Type.Optional(Type.Date()),  
  start:     Type.Optional(Type.Date()),  
  reviewed:  Type.Optional(Type.Date()),  

  created:   Type.Date({ default: new Date() }), // FIXME won't work in a long-lived process
  modified:  Type.Optional(Type.Date()),  
})
export type Entry = Static<typeof Entry>

// this is expensive
// TODO benchmark
export const C = TypeCompiler.Compile(Entry)

