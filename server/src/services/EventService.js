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
}

export const eventService = new EventService()