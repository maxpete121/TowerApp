import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventService } from "../services/EventService.js";




export class EventController extends BaseController{
    constructor(){
        super('api/events')
        this.router
        .get('', this.getEvents)
        .get('/:eventId', this.getEventById)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postEvent)
        .put('/:eventId', this.editEvent)
        .delete('/:eventId', this.cancelEvent)
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

    async editEvent(request, response, next){
        try {
            let newData = request.body
            let eventId = request.params.eventId
            let newEvent = await eventService.editEvent(newData, eventId)
            response.send(newEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(request, response, next){
        try {
            let eventId = request.params.eventId
            let event = await eventService.cancelEvent(eventId)
            response.send(event)      
        } catch (error) {
            next(error)
        }
    }
}