import { Type, Static } from '@sinclair/typebox'
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
  id:   () => 1,
  path: () => '/',
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

export const EntrySchema = Type.Object({
  id:        Type.Number({ default: Default.id   }),
  uid:       Type.String({ default: randomUUID  }),
  path:      Type.String({ default: Default.path }),

  type:      Type.String({ default: EntryTypes.Transient }),
  status:    Type.String({ default: StatusNames.Capture }),
  position:  Type.Number({ default: 1}),

  text:      Type.String(),
  uri:       Type.String(),

  tags:      Type.Array(Type.String(), { default: [] }), // TODO
  meta:      Type.Array(Type.String(), { default: [] }), // TODO

  priority:  Type.Optional(Type.Enum(Priority)),
  urgency:   Type.Optional(Type.Number({ default: 1.0 })),

  depends:   Type.Array(Type.String(), { default: [] }), // TODO
  parents:   Type.Array(Type.String(), { default: [] }), // TODO
  children:  Type.Array(Type.String(), { default: [] }), // TODO

  recur:     Type.Array(Type.String(), { default: [] }), // TODO
  repeat:    Type.Array(Type.String(), { default: [] }), // TODO
  review:    Type.Array(Type.String(), { default: [] }), // TODO

  cron:      Type.Optional(Type.Date()),
  
  due:       Type.Optional(Type.Date()),  
  end:       Type.Optional(Type.Date()),  
  scheduled: Type.Optional(Type.Date()),  
  until:     Type.Optional(Type.Date()),  
  wait:      Type.Optional(Type.Date()),  
  start:     Type.Optional(Type.Date()),  
  done:      Type.Optional(Type.Date()),  

  created:   Type.Date({ default: Default.date }),
  modified:  Type.Optional(Type.Date()),  
})

export type Entry = Static<typeof EntrySchema>

// function nextID(): Number {
//   return 1
// }

// function entryPath(): String {
//   return '/'  
// }


