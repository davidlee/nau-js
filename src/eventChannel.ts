import EventEmitter from 'events'

export class EventChannel extends EventEmitter { }

export const ec: EventChannel = new EventChannel()
export const eventChannel = ec

export default eventChannel
