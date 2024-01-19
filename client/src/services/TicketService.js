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
    }

    async getMyTickets(){
        let response = await api.get('account/tickets')
        let newTickets = await response.data.map(ticket => new Ticket(ticket))
        AppState.tickets = newTickets
    }

    async deleteTicket(ticketId){
        let response = await api.delete(`api/tickets/${ticketId}`)
        let ticketIndex = AppState.tickets.findIndex(ticket => ticket.id == ticketId)
        AppState.tickets.splice(ticketIndex, 1)
    }
}

export const ticketService = new TicketService()