import * as E  from '../entry.ts'

export class Entry {

  // _id:    ObjectId
  id!:       number
  uid!:      string
  path!:     string 

  type:     E.EntryTypes
  status:   E.StatusNames
  position?: number
  priority?: number
  urgency!:  number

  text:           string
  uri?:            string

  depends?:        Ref<Entry>[]
  parent?:         Ref<Entry>

  tags?:           string[]
  meta:           object

// updates:
// reviews:
  
  recur?:          object
  repeat?:         object
  review?:         object
  
  cron?:           Date
  due?:            Date
  end?:            Date
  scheduled?:      Date
  until?:          Date
  wait?:           Date
  start?:          Date
  reviewed?:       Date

  created!:         Date
  modified?:       Date

  constructor(text: string) {
    this.text = text
    this.type = E.EntryTypes.Transient
    this.status = E.StatusNames.Draft
    this.meta  =  {}
  }
}

export const EntrySchema = new EntitySchema<Entry> {
  name: 'Entity',
  properties: {
    id:
    
  }
}
