<template>
    <div class="comment-card">
        <span class="d-flex align-items-center">
            <img class="rounded-circle profile-pic me-2" :src="comment.creator.picture" alt="">
            <h6>{{ comment.creator.name }}</h6>
            <button v-if="account.id == comment.creator.id" class="ms-2 btn btn-outline-dark"><i class="mdi mdi-delete"></i></button>
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
import { Comment } from '../models/Comment'
  export default {
    props: {comment: {type: Comment, required: true}},
    setup() {
      return {
        account: computed(()=> AppState.account)
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