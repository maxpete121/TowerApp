<template>
    <router-link :to="{ name: 'Event', params: { eventId: event.id } }">
        <div class="event-card d-flex flex-column justify-content-between">
            <img class="img-fluid" :src="event.coverImg" alt="">
            <div class="event-child text-light">
                <h5>{{ event.name }}</h5>
                <h6>{{ event.location }}</h6>
                <span class="d-flex">
                    <h6 class="me-2">{{ date }}</h6>
                    <h6>{{ hours }}</h6>
                    <h6>{{ amPm }}</h6>
                </span>
            </div>
        </div>
    </router-link>
</template>
  
<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { Event } from '../models/Event'
import { RouterLink } from 'vue-router';
export default {
    props: { event: { type: Event, required: true } },
    setup(props) {
        let date = props.event.startDate.toLocaleDateString()
        let time = props.event.startDate.toLocaleTimeString()
        let hours = time.slice(0, 4)
        let amPm = time.slice(7, 11)
        return {
            styleB: `background-image: url(${props.event.coverImg}); background-position: center; background-size: cover;`,
            date,
            hours,
            amPm
        }
    }, components: { RouterLink }
}
</script>
  
<style lang="scss" scoped>
.event-card {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    outline: solid 2px rgb(90, 0, 0);
}

.event-card:hover {
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    outline: solid 2px rgb(90, 0, 0);
    transform: scale(1.02);
    cursor: pointer;
}

.event-child {
    background-color: rgba(0, 0, 0, 0.747);
    padding: 6px;

}
</style>