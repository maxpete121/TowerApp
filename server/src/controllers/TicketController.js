import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js";




export class TicketController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postTicket)
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
}