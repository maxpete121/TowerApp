<template>
  <section class="container-fluid section-main">
    <section class="row justify-content-center p-2">
      <div class="col-9 heading p-2 align-items-center justify-content-center justify-content-md-start d-flex">
        <div class="heading-child w-50 p-2">
          <h5 class="ms-2">Find an event for you!</h5>
          <h5 class="ms-2">Save events for later!</h5>
        </div>
      </div>
    </section>
    <section class="row justify-content-center mt-2">
      <div class="col-6 filter d-flex justify-content-center">
        <button class="ms-2 me-2 btn btn-outline-light">All</button>
        <button class="ms-2 me-2 btn btn-outline-light">Concert</button>
        <button class="ms-2 me-2 btn btn-outline-light">Convention</button>
        <button class="ms-2 me-2 btn btn-outline-light">Sport</button>
        <button class="ms-2 me-2 btn btn-outline-light">Digital</button>
      </div>
    </section>
    <section class="row">
      <div class="col-3 m-1" v-for="event in events">
        <EventCard :event="event"/>
      </div>
    </section>
  </section>
</template>
<!-- 'concert', 'convention', 'sport', 'digital' -->
<script>
import { computed, onMounted } from 'vue';
import {eventService} from '../services/EventService.js'
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue';

export default {
  setup() {
    onMounted(()=>{
      getEvents()
    })
    async function getEvents(){
      await eventService.getEvents()
    }
    return {
      events: computed(()=> AppState.events)
    }
  }, components: {EventCard}
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.section-main{
  background-color: black;
}
.heading{
  background-image: url(https://byrdtheatre.org/wp-content/uploads/2019/03/Byrd-Theater-Wide-Angle-Scott-Kelby.jpg);
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  outline: solid thin white;
  height: 200px;
}
.heading-child{
  background-color: rgba(0, 0, 0, 0.925);
  border-radius: 15px;
  color: white;
  outline: solid thin white;
}

.filter{
  background-color: rgb(90, 0, 0);
  color: white;
  padding: 10px;
  border-radius: 10px;
  outline: solid thin white;
}
</style>
