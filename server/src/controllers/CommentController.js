import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentService } from "../services/CommentService.js";





export class CommentController extends BaseController{
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.postComment)
        .delete('/:commentId', this.deleteComment)
    }

    async postComment(request, response, next){
        try {
            let commentData = request.body
            commentData.creatorId = request.userInfo.id
            let comments = await commentService.postComment(commentData)
            response.send(comments)
        } catch (error) {
            next(error)
        }
    }

    async deleteComment(request, response, next){
        try {
            let commentId = request.params.commentId
            let comment = await commentService.deleteComment(commentId)
            response.send(comment)
        } catch (error) {
            next(error)
        }
    }
}

