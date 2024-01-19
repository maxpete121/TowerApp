import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";




export class TicketController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postTicket)
        .delete('/:ticketId', this.deleteTicket)
    }

    async postTicket(request, response, next){
        try {
            let ticketData = request.body
            let userId = request.userInfo.id
            ticketData.accountId = userId
            let ticket = await ticketService.postTicket(ticketData)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }

    async deleteTicket(request, response, next){
        try {
            let ticketId = request.params.ticketId 
            let userId = request.userInfo.id
            let ticket = await ticketService.deleteTicket(ticketId, userId)
            response.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}