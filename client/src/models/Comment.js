


export class Comment{
    constructor(data){
        this.id = data._id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.creator = data.creator
        this.body = data.body
    }
}