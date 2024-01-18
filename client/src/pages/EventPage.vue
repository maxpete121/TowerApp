<template>
    <section class="container-fluid bg-black">
        <section class="row me-1 pt-2 justify-content-center">
            <div class="col-3">
                <img class="img-fluid" :src="events.coverImg" alt="">
            </div>
            <div class="col-6 bg-dark p-2">
                <div class="text-light">
                    <span>
                        <h4>{{ events.name }}</h4>
                        <h5>{{ events.location }}</h5>
                    </span>
                </div>
                <span class="text-light">
                    <p>{{ events.description }}</p>
                </span>
                <div class="d-flex justify-content-between">
                    <span class="d-flex text-light">
                        <h5 class="me-2">Spots Left:</h5>
                        <h5>{{ events.spotsLeft }}</h5>
                    </span>
                    <span>
                        <button @click="postTicket()" class="btn btn-outline-light">Get Ticket 🎟</button>
                        <button v-if="events.creatorId == account.id" @click="" class="btn btn-outline-danger ms-2">Cancel❌</button>
                    </span>
                </div>
            </div>
        </section>
        <section class="row justify-content-center mt-2">
            <div class="col-9 bg-dark text-light p-2 rounded-2">
                <h5>See who's attending</h5>
                <div class="d-flex">
                    <div class="me-3" v-for="ticket in tickets">
                        <TicketComp :ticket="ticket"/>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
  
<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { eventService } from '../services/EventService.js'
import { useRoute } from 'vue-router';
import {ticketService} from '../services/TicketService.js'
import { Ticket } from '../models/Ticket';
import TicketComp from '../components/TicketComp.vue';
export default {
    
    setup() {
        let eventIdVal = computed(()=> AppState.activeEvent)
        onMounted(() => {
            findEventId()
        })
        const route = useRoute()
        async function findEventId() {
            let eventId = route.params.eventId
            await eventService.findEventId(eventId)
            await getEventTickets(eventId)
        }

        async function getEventTickets(){
            let eventId = route.params.eventId
            await ticketService.getEventTickets(eventIdVal.value.id)

        }


        async function postTicket(){
            let eventId = route.params.eventId
            await ticketService.postTicket(eventId)
        }
        return {
            events: computed(() => AppState.activeEvent),
            tickets: computed(()=> AppState.tickets),
            account: computed(()=> AppState.account),
            postTicket,
        }
    }, components: {TicketComp}
}
</script>
  
<style scoped>

</style>