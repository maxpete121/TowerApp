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

    async getUserTickets(userId){
        let foundTickets = await dbContext.Tickets.find({ accountId: userId }).populate('profile', 'name picture').populate({
            path: 'event',
            populate: {
                path: 'ticketCount'
            }
        })
        return foundTickets
    }

    async getEventTickets(eventId){
        let foundTickets = await dbContext.Tickets.find({ eventId: eventId }).populate('profile', 'name picture').populate({
            path: 'event',
            populate: {
                path: 'ticketCount'
            }
        })
        return foundTickets
    }
}

export const ticketService = new TicketService()