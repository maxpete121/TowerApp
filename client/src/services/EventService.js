import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { Event } from "../models/Event"

class EventService{
    async getEvents(){
        let response = await api.get('api/events')
        const allEvents = response.data.map(func => new Event(func))
        AppState.events = allEvents
        console.log(AppState.events)
    }
}

export const eventService = new EventService()