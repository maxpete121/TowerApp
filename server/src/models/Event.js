import { Schema } from "mongoose";



export const EventSchema = new Schema({
    name: {type: String, required: true, maxLength: 50},
    description: {type: String, required: true, maxLength: 200},
    coverImg: {type: String, required: true, maxLength: 500},
    location: {type: String, required: true},
    capacity: {type: Number, required: true},
    startDate: {type: Date, required: true},
    isCanceled: {type: Boolean, required: true},
    type: {type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true},
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    ticketCount: {type: Schema.Types.ObjectId,ref: 'Ticket', required: true}
},{toJSON: {virtuals: true}})

EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
  })

  EventSchema.virtual('ticket', {
    localField: 'ticketCount',
    foreignField: '_id',
    ref: 'Ticket',
  })