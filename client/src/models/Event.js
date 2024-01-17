



export class Event{
    constructor(data, spotsLeft){
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate)
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.ticketCount = data.ticketCount
        this.id = data._id
        this.spotsLeft = this.spotsHandler
    }

    get spotsHandler(){
        let spots = this.capacity - this.ticketCount
        return spots
    }
}




