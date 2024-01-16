import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventService } from "../services/EventService.js";




export class EventController extends BaseController{
    constructor(){
        super('api/events')
        this.router
        .get('', this.getEvents)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postEvent)
    }

    async postEvent(request, response, next){
        try {
            let eventData = request.body
            eventData.creatorId = request.userInfo.id
            let created = await eventService.postEvent(eventData)
            response.send(eventData)
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
}