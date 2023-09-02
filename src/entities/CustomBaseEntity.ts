import { EntitySchema } from "@mikro-orm/core";
import uid from '../uid'

export default class CustomBaseEntity {
  id!: number
  uid: string
  created!: Date
  updated?: Date

  constructor() {
    this.uid = uid()
  }
}

export const schema = new EntitySchema<CustomBaseEntity>({
  name: 'CustomBaseEntity',
  abstract: true,
  properties: {
    id: { type: 'number', primary: true },
    created: { type: 'Date', onCreate: () => new Date() },
    updated: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true },
    uid: { type: 'string' }
  },
});
