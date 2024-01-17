import { dbContext } from "../db/DbContext.js"





class EventService{

    async postEvent(eventData){
        let newEvent = await dbContext.Events.create(eventData)
        await newEvent.populate('creator ticket')
        return newEvent
    }
    async getEvents(){
        let events = await dbContext.Events.find()
        return events
    }

    async getEventById(eventId){
        let event = await dbContext.Events.findById(eventId)
        return event
    }

    async editEvent(newData, eventId){
        let eventEdit = await dbContext.Events.findById(eventId)
        eventEdit.name = newData.name != undefined ? newData.name : eventEdit.name
        eventEdit.description = newData.description != undefined ? newData.description : eventEdit.description
        eventEdit.coverImg = newData.coverImg != undefined ? newData.coverImg : eventEdit.coverImg
        eventEdit.location = newData.location != undefined ? newData.location : eventEdit.location
        eventEdit.capacity = newData.capacity != undefined ? newData.capacity : eventEdit.capacity
        eventEdit.startDate = newData.startDate != undefined ? newData.startDate : eventEdit.startDate
        eventEdit.type = newData.type != undefined ? newData.type : eventEdit.type
        eventEdit.ticketCount = newData.ticketCount != undefined ? newData.ticketCount : eventEdit.ticketCount
        await eventEdit.save()
        return eventEdit
    }

    async cancelEvent(eventId){
        let event = await dbContext.Events.findById(eventId)
        event.isCanceled = true
        await event.save()
        return event
    }
}

export const eventService = new EventService()