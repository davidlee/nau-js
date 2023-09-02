import { EntitySchema } from "@mikro-orm/core";

// export abstract class BaseEntity {
//   @PrimaryKey()
//   id!: number;

//   @Property()
//   created: Date = new Date();

//   @Property({ onUpdate: () => new Date() })
//   updated: Date = new Date();
// }

export default interface CustomBaseEntity {
  id: number
  created: Date
  updated: Date
}

export const schema = new EntitySchema<CustomBaseEntity>({
  name: 'CustomBaseEntity',
  abstract: true,
  properties: {
    id: { type: 'number', primary: true },
    created: { type: 'Date', onCreate: () => new Date() },
    updated: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true },
  },
});
