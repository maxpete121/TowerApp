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
                    <span v-if="events.spotsLeft > 0" class="d-flex text-light">
                        <h5 class="me-2">Spots Left:</h5>
                        <h5>{{ events.spotsLeft }}</h5>
                    </span>
                    <span v-else class="d-flex text-light">
                        <h5 class="me-2 text-danger">No spots available.</h5>
                    </span>
                    <div v-if="events.isCanceled == true" class="text-light p-2 bg-black rounded-3 d-flex align-items-center">
                        <h4>Event Canceled❌</h4>
                    </div>
                    <span>
                        <button v-if="events.spotsLeft > 0 && events.isCanceled == false" @click="postTicket()" class="btn btn-outline-light">Get Ticket 🎟</button>
                        <button v-if="events.creatorId == account.id && events.isCanceled == false" @click="cancelEvent(events.id)" class="btn btn-outline-danger ms-2">Cancel❌</button>
                    </span>
                </div>
            </div>
        </section>
        <div class="row justify-content-center mt-3">
            <div class="col-3 bg-dark text-light p-2 rounded-2 text-center">
                <h5>See who's attending</h5>
            </div>
        </div>
        <div class="row bg-dark p-2 rounded-2 mt-1 ms-2 me-2">
            <div class="me-4 col-2 text-light" v-for="ticket in tickets">
                <TicketComp :ticket="ticket"/>
            </div>
        </div>
    </section>
    <section class="container-fluid bg-black">
        <div class="row justify-content-center pt-4">
            <div class="col-7 bg-white d-flex flex-column align-items-center p-2 rounded-2">
                <h4>Leave a comment</h4>
                <form @submit.prevent="postComment()" class="w-50 text-center" action="">
                    <textarea v-model="newComment.body" class="form-control" id="" cols="30" rows="4"></textarea>
                    <button class="btn btn-outline-dark mt-1">Post</button>
                </form>
            </div>
        </div>
        <div class="row justify-content-center mt-2">
            <div class="col-6 bg-white rounded-2">
                <div class="mt-3 p-2" v-for="comment in comments">
                    <CommentCard :comment="comment"/>
                </div> 
            </div>
        </div>
    </section>
</template>
  
<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState';
import { eventService } from '../services/EventService.js'
import { useRoute } from 'vue-router';
import {ticketService} from '../services/TicketService.js'
import { Ticket } from '../models/Ticket';
import TicketComp from '../components/TicketComp.vue';
import {commentService} from '../services/CommentService.js';
import CommentCard from '../components/CommentCard.vue';
export default {
    
    setup() {
        const newComment = ref({})
        let eventIdVal = computed(()=> AppState.activeEvent)
        onMounted(() => {
            findEventId()
        })
        const route = useRoute()
        async function findEventId() {
            let eventId = route.params.eventId
            await eventService.findEventId(eventId)
            await getEventTickets(eventId)
            getComments()
        }

        async function getEventTickets(){
            let eventId = route.params.eventId
            await ticketService.getEventTickets(eventIdVal.value.id)
        }


        async function postTicket(){
            let eventId = route.params.eventId
            await ticketService.postTicket(eventId)
            AppState.activeEvent.spotsLeft--
        }

        async function cancelEvent(eventId){
            await eventService.cancelEvent(eventId)
        }

        async function getComments(){
            let eventId = route.params.eventId
            await commentService.getComments(eventId)
        }

        async function postComment(){
            let eventId = route.params.eventId
            newComment.value.eventId = eventId
            await commentService.postComment(newComment.value)
            newComment.value = {}
        }

        return {
            events: computed(() => AppState.activeEvent),
            tickets: computed(()=> AppState.tickets),
            account: computed(()=> AppState.account),
            comments: computed(()=> AppState.comments),
            newComment,
            postTicket,
            cancelEvent,
            postComment
        }
    }, components: {TicketComp, CommentCard}
}
</script>
  
<style scoped>

</style>