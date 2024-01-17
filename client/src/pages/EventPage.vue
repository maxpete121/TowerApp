<template>
    <section class="container-fluid bg-black">
        <section class="row pt-2 justify-content-center">
            <div class="col-3">
                <img class="img-fluid" :src="events.coverImg" alt="">
            </div>
            <div class="col-6 ms-2 bg-dark p-2">
                <div class="text-light">
                    <span>
                        <h4>{{ events.name }}</h4>
                        <h5>{{ events.location }}</h5>
                    </span>
                </div>
                <span class="text-light">
                    <p>{{ events.description }}</p>
                </span>
            </div>
        </section>
        <section class="row">
            <div class="col-9 bg-dark">
                <h6>See who's attending</h6>
            </div>
        </section>
    </section>
</template>
  
<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { eventService } from '../services/EventService.js'
import { useRoute } from 'vue-router';
export default {
    setup() {
        onMounted(() => {
            findEventId()
        })
        const route = useRoute()
        async function findEventId() {
            let eventId = route.params.eventId
            await eventService.findEventId(eventId)
        }
        return {
            events: computed(() => AppState.activeEvent),
        }
    }
}
</script>
  
<style scoped></style>