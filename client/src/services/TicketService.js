import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"



class TicketService{
    async getEventTickets(eventId){
            console.log(eventId)
            let response = await api.get(`events/${eventId}/tickets`)
            let tickets = response.data.map(ticket => new Ticket(ticket))
            AppState.tickets = tickets
    }
}

export const ticketService = new TicketService()