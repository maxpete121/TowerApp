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
  <div class="row text-center pt-4">
    <h3>Your Tickets</h3>
  </div>
  <section class="row justify-content-center">
    <div class="col-10 col-lg-6">
      <div class="mt-2" v-for="ticket in tickets">
        <TicketCard :ticket="ticket"/>
      </div>
    </div>
  </section>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue';
  import { AppState } from '../AppState';
  import { ticketService } from '../services/TicketService';
  import TicketCard from '../components/TicketCard.vue';
  export default {
    setup() {
      onMounted(()=>{
      getMyTickets()
    })
    async function getMyTickets(){
      await ticketService.getMyTickets()
    }
      return {
        account: computed(()=> AppState.account),
        tickets: computed(()=> AppState.tickets)
      }
    }, components: {TicketCard}
  }
  </script>

  <style scoped>
.profile-pic{
    height: 50px;
    width: 50px;
}
</style>