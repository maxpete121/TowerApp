import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"





class EventService{

    async postEvent(eventData){
        let newEvent = await dbContext.Events.create(eventData)
        await newEvent.populate('creator ticketCount')
        return newEvent
    }
    async getEvents(){
        let events = await dbContext.Events.find().populate('creator', 'name picture').populate('ticketCount')
        return events
    }

    async getEventById(eventId){
        let event = await dbContext.Events.findById(eventId).populate('creator', 'name picture').populate('ticketCount')
        return event
    }

    async editEvent(newData, eventId, userId){
        let eventEdit = await dbContext.Events.findById(eventId)
        if(eventEdit.creatorId == userId){
            eventEdit.name = newData.name != undefined ? newData.name : eventEdit.name
            eventEdit.description = newData.description != undefined ? newData.description : eventEdit.description
            eventEdit.coverImg = newData.coverImg != undefined ? newData.coverImg : eventEdit.coverImg
            eventEdit.location = newData.location != undefined ? newData.location : eventEdit.location
            eventEdit.capacity = newData.capacity != undefined ? newData.capacity : eventEdit.capacity
            eventEdit.startDate = newData.startDate != undefined ? newData.startDate : eventEdit.startDate
            eventEdit.type = newData.type != undefined ? newData.type : eventEdit.type
            await eventEdit.save()
            return eventEdit
        }else{
            throw new Forbidden('NOT ERROR')
        }
    }

    async cancelEvent(eventId){
        let event = await dbContext.Events.findById(eventId)
        event.isCanceled = true
        await event.save()
        return event
    }

    async getEventByQuery(query){
        let event = await dbContext.Events.find({type: query}).populate('creator', 'name picture').populate('ticketCount')
        return event
    }
}

export const eventService = new EventService()