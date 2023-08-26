import { z } from "zod";

// function generateUUID() {
//   return "IRSETIRESNTIEI"
// }
// const _StatusNames = z.enum(["DRAFT", "READY", "WIP", "DONE", "CANCELLED", "SOMEDAY", "WAITING", "TEMPLATE", "DELETED"])

const _Entry = z.object({
  uuid: z.string().default(() => 'generateUUID()'),
  id: z.number(),
  position: z.number().nullable(),
  status: z.string().default('DRAFT'),
  text: z.string(),
  
  // string().datetime() ?
  due: z.date().nullable(),
  end: z.date().nullable(),
  scheduled: z.date().nullable(),
  until: z.date().nullable(),
  wait: z.date().nullable(),
  start: z.date().nullable(),
  
  priority: z.number().nullable(),
  urgency: z.number().default(1.0),
  
  parent: z.string().nullable(),
  
  tags: z.array(z.string()).default([]),
  metadata: z.record(z.string()).default({}),

  created: z.date().default(() => new Date()),
  modified: z.date().default(() => new Date()),
}).partial().required({
  id: true,
  uuid: true,
  description: true,
  created: true,
  modified: true,
  status: true,
})


export const e = _Entry.parse({ id: 5, text: "hello" });

// extract the inferred type
type _Entry = z.infer<typeof _Entry>;

console.log(e);
console.log(e.description);


/*
    UUID = Types::String.default { SecureRandom.uuid }
      schema do
        attribute :uuid,        Types::UUID
        attribute :id,          Types::String # cache
        # attribute :order,       Types::Int
        attribute :status,      Types::String # ??
        attribute :description, Types::String

        attribute :due,         Types::Date
        attribute :end,         Types::Date
        attribute :scheduled,   Types::Date
        attribute :until,       Types::Date
        attribute :wait,        Types::Date
        attribute :start,       Types::Date # ??

        attribute :priority,    Types::Number # Enum
        attribute :urgency,     Types::Number # Enum

        attribute :area,        Types::UUID
        attribute :parent,      Types::UUID

        attribute :annotations, Types::Array # of UUID
        attribute :tags,        Types::Array
        attribute :metadata,    Types::Hash

        attribute :created,     Types::Date
        attribute :modified,    Types::Date
      end

      auto_struct(true)
    end
*/