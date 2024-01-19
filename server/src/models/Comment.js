import { Schema } from "mongoose";





export const CommentSchema = new Schema({
    creatorId: {type: Schema.Types.ObjectId, ref: 'Account', required: true},
    eventId: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
    body: {type: String, required: true, maxLength: 150}
}, {toJSON: {virtuals: true}})

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
  })

  CommentSchema.virtual('event', {
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true
  })