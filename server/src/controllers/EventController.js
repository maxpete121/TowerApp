import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventService } from "../services/EventService.js";




export class EventController extends BaseController{
    constructor(){
        super('api/events')
        this.router
        .get('', this.getEvents)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .get('/:eventId', this.getEventById)
        .post('', this.postEvent)
    }

    async postEvent(request, response, next){
        try {
            let eventData = request.body
            eventData.creatorId = request.userInfo.id
            let created = await eventService.postEvent(eventData)
            response.send(created)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(request, response, next){
        try {
            let events = await eventService.getEvents()
            response.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(request, response, next){
        try {
            let eventId = request.params.eventId
            let event = await eventService.getEventById(eventId)
            response.send(event)
        } catch (error) {
            next(error)
        }
    }
}