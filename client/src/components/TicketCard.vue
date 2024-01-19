<template>
    <div class="ticket-card d-flex rounded-3">
        <img class="img-fluid image-card" :src="ticket.event.coverImg" alt="">
        <span class="mt-3 ms-4">
            <h5>{{ ticket.event.name }}</h5>
            <button @click="deleteTicket(ticket.id)" class="btn btn-outline-light mt-1">Cancel Ticket</button>
        </span>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
import { Ticket } from '../models/Ticket'
import {ticketService} from '../services/TicketService.js'
  export default {
    props: {ticket: {type: Ticket, required: true}},
    setup() {
        async function deleteTicket(ticketId){
            await ticketService.deleteTicket(ticketId)
        }
      return {
        deleteTicket
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .ticket-card{
    background-color: black;
    color: white;
    height: 180px;
    overflow: hidden;
  }
  .image-card{
    width: 180px;
  }
</style>