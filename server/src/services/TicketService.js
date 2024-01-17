import { dbContext } from "../db/DbContext.js"




class TicketService{
    async postTicket(ticketData){
        let newTicket = (await dbContext.Tickets.create(ticketData))
        await newTicket.populate('profile', 'name picture')
        await newTicket.populate({
            path: 'event',
            populate: {
                path: 'ticketCount'
            }
        })
        return newTicket
    }
}

export const ticketService = new TicketService()