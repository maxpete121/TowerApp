<template>
    <div class="d-flex flex-column align-items-center">
        <img class="rounded-circle profile-pic" :src="ticket.profile.picture" alt="">
        <p class="profile-name">{{ ticket.profile.name }}</p>
    </div>
</template>
  
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
import { Ticket } from '../models/Ticket'
export default {
    props: {ticket: {type: Ticket, required: true}},
    setup() {
        return {
            tickets: computed(() => AppState.tickets),
        }
    }
}
</script>
  
<style lang="scss" scoped>
.profile-pic{
    height: 50px;
    width: 50px;
}

.profile-name{
    font-size: smaller;
}
</style>