import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { Event } from "../models/Event"

class EventService{
    async getEvents(){
        let response = await api.get('api/events')
        const allEvents = response.data.map(func => new Event(func))
        AppState.events = allEvents
        // console.log(allEvents)
    }

    async findEventId(eventId){
        let response = await api.get(`api/events/${eventId}`)
        let newEvent = await new Event(response.data)
        console.log(newEvent)
        AppState.activeEvent = newEvent
    }

    async getEventByQuery(query){
        let response = await api.get(`api/events/type/${query}`)
        let allEvents = response.data.map(events => new Event(events))
        AppState.events = allEvents
    }

    async postEvent(eventData){
        console.log(eventData)
        let response = await api.post('api/events', eventData)
        let newEvent = new Event(response.data)
        AppState.events.push(newEvent)
        return newEvent
    }
}

export const eventService = new EventService()