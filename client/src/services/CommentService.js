import { AppState } from "../AppState"
import { api } from "./AxiosService"
import { Comment } from "../models/Comment"



class CommentService{
    async getComments(eventId){
        let response = await api.get(`api/events/${eventId}/comments`)
        let newComments = await response.data.map(comment => new Comment(comment))
        AppState.comments = newComments
        console.log(AppState.comments)
    }

    async postComment(commentData){
        let response = await api.post('api/comments', commentData)
        let newComment = new Comment(response.data)
        AppState.comments.unshift(newComment)
    }

    async deleteComment(commentId){
        let response = await api.delete(`api/comments/${commentId}`)
        let commentIndex = AppState.comments.findIndex(comment => comment.id == commentId)
        AppState.comments.splice(commentIndex, 1)
    }
}

export const commentService = new CommentService()