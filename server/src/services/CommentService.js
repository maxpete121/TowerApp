import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class CommentService{

    async postComment(commentData){
        let newComment = (await dbContext.Comments.create(commentData)).populate('creator')
        return newComment
    }

    async getComments(eventId){
        let foundComments = await dbContext.Comments.find({eventId: eventId}).populate('creator')
        return foundComments
    }

    async deleteComment(commentId, userId){
        let foundComment = await dbContext.Comments.findById(commentId).populate('creator')
        if(foundComment.creatorId == userId){
            await foundComment.deleteOne()
            return 'Comment Deleted'
        }else{
            throw new Forbidden('NOT Authorized')
        }
    }
}

export const commentService = new CommentService()