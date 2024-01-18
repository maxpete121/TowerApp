<template>
  <section class="row justify-content-center">
    <div class="col-4 text-center">
      <h3>Welcome</h3>
      <span class="d-flex align-items-center justify-content-center">
        <img class="profile-pic rounded-circle me-2" :src="account.picture" alt="">
        <h5>{{ account.name }}</h5>
      </span>
    </div>
  </section>
  </template>
  
  <script>
  import { computed } from 'vue';
  import { AppState } from '../AppState';
  export default {
    setup() {
      return {
        account: computed(()=> AppState.account),
      }
    }
  }
  </script>

  <style scoped>
.profile-pic{
    height: 50px;
    width: 50px;
}
</style>