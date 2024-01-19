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
}

export const commentService = new CommentService()