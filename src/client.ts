import { PrismaClient } from '@prisma/client'
import { withBark } from 'prisma-extension-bark'

export const prisma = new PrismaClient()
export const bark = new PrismaClient().$extends(withBark({ modelNames: ['node', 'tag'] }))



// const myNewRootNode = await xprisma.node.createRoot({ data: { name: 'My new root' } })
// { id: 1, path: '0001', depth: 1, numchild: 0, name: 'My new root' }
