import { dbContext } from "../db/DbContext.js"




class CommentService{

    async postComment(commentData){
        let newComment = (await dbContext.Comments.create(commentData)).populate('creator')
        return newComment
    }
}

export const commentService = new CommentService()