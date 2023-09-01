import { Type, Static } from '@sinclair/typebox'
import { TypeCompiler } from '@sinclair/typebox/compiler'
import { Value } from '@sinclair/typebox/value'
import { uid } from './uid.js'

// EntryUpdate (compose)

export const Entry = Type.Object({
  id:        Type.Number(), // required
  uid:       Type.String(), // required
  path:      Type.String(), // required

  type:      Type.String({ default: EntryTypes.Transient }),
  status:    Type.String({ default: StatusNames.Capture }),
  position:  Type.Number({ default: 1}),

  text:      Type.String(),
  uri:       Type.Optional(Type.String()),

  // these will need a mix of free and structured bits
  tags:      Type.Object({}), 
  meta:      Type.Object({}), 

  priority:  Type.Optional(Type.Enum(Priority)),

  // urgency -- compute at runtime

  depends:   Type.Optional(Type.Array(Type.String())), 
  parents:   Type.Optional(Type.Array(Type.String())), 

  // these are for configuration - may not want tsrings, we'll see
  recur:     Type.Optional(Type.String()), 
  repeat:    Type.Optional(Type.String()), 
  review:    Type.Optional(Type.String()), 

  // when now > cron, needs processing for recurrence etc
  cron:      Type.Optional(Type.Date()), 
  
  due:       Type.Optional(Type.Date()),  
  end:       Type.Optional(Type.Date()),  
  scheduled: Type.Optional(Type.Date()),  
  until:     Type.Optional(Type.Date()),  
  wait:      Type.Optional(Type.Date()),  
  start:     Type.Optional(Type.Date()),  
  reviewed:  Type.Optional(Type.Date()),  

  created:   Type.Transform(Type.String()).Decode(value => new Date(value)).Encode(value => value.toISOString()),
  modified:  Type.Transform(Type.Optional(Type.String())).Decode(value => new Date(value)).Encode(value => value.toISOString()),
})

export type Entry = Static<typeof Entry>

// this is expensive
// TODO benchmark
export const C = TypeCompiler.Compile(Entry)

export type EntryFields = {
  id?:           number,
  uid?:          string,
  path?:         string,
  
  type?:     EntryTypes,
  status?:  StatusNames,
  position?:     number,  
  
  text?:         string,
  uri?:          string,
  
  tags?:         object,
  meta?:         object,
  
  priority?:     number,
  
  depends?:      string[]
  parents?:      string[]
  
  recur?:        string[]
  repeat?:       string[]
  review?:       string[]
  
  cron?:           Date,
  
  due?:            Date,
  end?:            Date,
  scheduled?:      Date,
  until?:          Date,
  wait?:           Date, 
  start?:          Date, 
  reviewed?:       Date,  
  
  created?:        Date, 
  modified?:       Date, 
}

export function buildEntry(fields: EntryFields): Entry {
  // apply defaults
  const entry: Entry = Object.assign(Value.Create(Entry), {
    uid:     uid(), 
    created: new Date(),
  })

  // apply arguments
  Object.assign(entry, fields)
   
  return entry
}
