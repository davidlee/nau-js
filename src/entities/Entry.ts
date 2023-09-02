import { EntryTypes, StatusNames, }  from '../entry.js'
import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  ManyToOne,
  Unique,
  JsonType,
  EntitySchema,
  Ref,
} from "@mikro-orm/core"
import { CustomBaseEntity } from "./CustomBaseEntity.js"

export interface Entry extends CustomBaseEntity {
  id: number
  created: Date
  updated: Date

  // _id:    ObjectId
  uid:      string
  path:     string 

  type:      EntryTypes
  status:    StatusNames
  position?: number
  priority?: number
  urgency:  number

  text:      string
  uri?:      string

  // depends?:  Ref<Entry>[]
  // parent?:   Ref<Entry>

  tags?:     string[]
  meta:      JsonType

// updates:
// reviews:
  
  recur?:    JsonType
  repeat?:   JsonType
  review?:   JsonType
  
  cron?:           Date
  due?:            Date
  end?:            Date
  scheduled?:      Date
  until?:          Date
  wait?:           Date
  start?:          Date
  reviewed?:       Date
}

export const EntrySchema = new EntitySchema<Entry, CustomBaseEntity>({
  name:      'Entry',
  extends:   'CustomBaseEntity',
  properties: {
  
    uid:      { type: 'string' },
    path:     { type: 'string' }, 

    type:     { enum: true, items: () => EntryTypes,  default: EntryTypes.Transient },
    status:   { enum: true, items: () => StatusNames, default: StatusNames.Draft },
    position: { type: 'number',  default: 1 },
    priority: { type: 'number', default: 1.0 },
    urgency:  { type: 'string', nullable: true},

    text:     { type: 'text' },
    uri:      { type: 'text', nullable: true }, 

    // depends?:        Ref<Entry>[]
    // parent?:         Ref<Entry>
      
    tags:     { type: 'string[]', default: [] },
    meta:     { type: JsonType },

    // updates:
    // reviews:
  
    recur:      { type: JsonType, nullable: true },
    repeat:     { type: JsonType, nullable: true },
    review:     { type: JsonType, nullable: true },
  
    cron:       { type: Date, nullable: true },
    due:        { type: Date, nullable: true },
    end:        { type: Date, nullable: true },
    scheduled:  { type: Date, nullable: true },
    until:      { type: Date, nullable: true },
    wait:       { type: Date, nullable: true },
    start:      { type: Date, nullable: true },
    reviewed:   { type: Date, nullable: true },
  }
})
