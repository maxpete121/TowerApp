import { dbContext } from "../db/DbContext.js"




class CommentService{

    async postComment(commentData){
        let newComment = (await dbContext.Comments.create(commentData)).populate('creator')
        return newComment
    }

    async getComments(eventId){
        let foundComments = await dbContext.Comments.find({eventId: eventId}).populate('creator')
        return foundComments
    }

    async deleteComment(commentId){
        let foundComment = await dbContext.Comments.findById(commentId).populate('creator')
        await foundComment.deleteOne()
        return 'Comment Deleted'
    }
}

export const commentService = new CommentService()