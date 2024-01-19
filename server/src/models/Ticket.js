import { Schema } from "mongoose";




export const TicketSchema = new Schema({
    eventId: {type: Schema.Types.ObjectId,ref: 'Event', required: true},
    accountId: {type: Schema.Types.ObjectId, ref: 'Account'}
},{toJSON:{virtuals: true}})

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
  })

  TicketSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true
  })



