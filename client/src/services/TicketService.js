import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"



class TicketService{
    async getEventTickets(eventId){
        let response = await api.get(`api/events/${eventId}/tickets`)
        let tickets = response.data.map(ticket => new Ticket(ticket))
        AppState.tickets = tickets
        console.log(tickets)
    }

    async postTicket(eventId){
        let temp = {
            eventId: eventId,
            accountId: ""
        }
        let response = await api.post('api/tickets', temp)
        let ticket = new Ticket(response.data)
        AppState.tickets.unshift(ticket)
        console.log(ticket)
    }
}

export const ticketService = new TicketService()