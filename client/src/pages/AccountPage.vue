<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>
  <div class="row"></div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { ticketService } from '../services/TicketService';
export default {
  setup() {

    return {
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
