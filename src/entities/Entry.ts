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
import CustomBaseEntity from "./CustomBaseEntity.js"

export class  Entry extends CustomBaseEntity {
  path!:      string 

  type:       EntryTypes
  status:     StatusNames
  position?:  number
  priority?:  number
  urgency:    number

  text:       string
  uri?:       string

  tags?:      string[]
  meta:       JsonType

  // depends?:  Ref<Entry>[]
  // parent?:   Ref<Entry>

  // updates:
  // reviews:
  
  recur?:     JsonType
  repeat?:    JsonType
  review?:    JsonType
  
  cron?:      Date
  due?:       Date
  end?:       Date
  scheduled?: Date
  until?:     Date
  wait?:      Date
  start?:     Date
  reviewed?:  Date

  constructor(text: string, rest: object={}) {
    super()
    this.text = text
    this.type = EntryTypes.Transient
    this.status = StatusNames.Draft
    this.meta   = new JsonType()
    this.urgency = 1.0
  }
}

export const EntrySchema = new EntitySchema<Entry, CustomBaseEntity>({
  name:      'Entry',
  extends:   'CustomBaseEntity',
  properties: {
    path:      { type: 'string' }, 

    type:      { enum: true, items: () => EntryTypes,  default: EntryTypes.Transient },
    status:    { enum: true, items: () => StatusNames, default: StatusNames.Draft },
    position:  { type: 'number',  default: 1 },
    priority:  { type: 'number', default: 1.0 },
    urgency:   { type: 'string', nullable: true},

    text:      { type: 'text' },
    uri:       { type: 'text', nullable: true }, 

      
    tags:      { type: 'string[]', default: [] },
    meta:      { type: JsonType },

    // depends?:        Ref<Entry>[]
    // parent?:         Ref<Entry>

    // updates:
    // reviews:
  
    recur:     { type: JsonType, nullable: true },
    repeat:    { type: JsonType, nullable: true },
    review:    { type: JsonType, nullable: true },
  
    cron:      { type: Date, nullable: true },
    due:       { type: Date, nullable: true },
    end:       { type: Date, nullable: true },
    scheduled: { type: Date, nullable: true },
    until:     { type: Date, nullable: true },
    wait:      { type: Date, nullable: true },
    start:     { type: Date, nullable: true },
    reviewed:  { type: Date, nullable: true },
  }
})
