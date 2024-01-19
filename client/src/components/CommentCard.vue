<template>
    <div class="comment-card">
        <span class="d-flex align-items-center">
            <img class="rounded-circle profile-pic me-2" :src="comment.creator.picture" alt="">
            <h6>{{ comment.creator.name }}</h6>
            <button @click="deleteComment(comment.id)" v-if="account.id == comment.creator.id" class="ms-2 btn btn-outline-dark"><i class="mdi mdi-delete"></i></button>
        </span>
        <div class="m-1 comment-body pt-1 ps-2">
            <p>{{ comment.body }}</p>
        </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
import { Comment } from '../models/Comment';
import { commentService } from '../services/CommentService';
  export default {
    props: {comment: {type: Comment, required: true}},
    setup() {
        async function deleteComment(commentId){
            await commentService.deleteComment(commentId)
        }
      return {
        account: computed(()=> AppState.account),
        deleteComment
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
.profile-pic{
    height: 40px;
    width: 40px;
}

.comment-card{
    border-bottom: solid;
}

.comment-body{
    border: solid thin;
}
</style>