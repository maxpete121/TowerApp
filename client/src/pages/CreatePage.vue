<template>
    <section class="container-fluid">
        <div class="row text-center mt-3">
            <h3>Create An Event!</h3>
        </div>
        <form @submit.prevent="postEvent()" class="mt-2" action="">
            <div class="row justify-content-center">
                <div class="col-lg-3 col-10 d-flex flex-column">
                    <label for="event-name">Event Name...</label>
                    <input required v-model="newEvent.name" class="form-control" name="event-name" type="text">
                </div>
                <div class="col-lg-3 col-10 d-flex flex-column">
                    <label for="eventDate">Event Date and Time...</label>
                    <input required v-model="newEvent.startDate" class="form-control" name="eventDate" type="datetime-local">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-3 col-10 d-flex flex-column">
                    <label for="location">Location...</label>
                    <input required v-model="newEvent.location" class="form-control" name="location" type="text">
                </div>
                <div class="col-lg-3 col-10 d-flex flex-column">
                    <label for="coverImg">Image...</label>
                    <input required v-model="newEvent.coverImg" class="form-control" name="coverImg" type="url">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-3 col-10 d-flex flex-column">
                    <label for="type">Type...</label>
                    <select required v-model="newEvent.type" class="form-control">
                        <option disabled selected value="concert">Choose Type</option>
                        <option value="concert">Concert</option>
                        <option value="convention">Convention</option>
                        <option value="sport">Sport</option>
                        <option value="digital">Digital</option>
                    </select>
                </div>
                <div class="col-lg-3 col-10 d-flex flex-column">
                    <span class="d-flex">
                        <label for="capacity">Capacity...</label>
                        <p class="ms-2">{{ newEvent.capacity }}</p>
                    </span>
                    <input required v-model="newEvent.capacity" class="" name="capacity" type="range" min="1" max="500">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-lg-6 col-10 d-flex flex-column">
                    <label for="description">Description...</label>
                    <textarea v-model="newEvent.description" class="form-control" name="description" id="" cols="80" rows="6"></textarea>
                </div>
            </div>
            <div class="row justify-content-center">
                <span class="d-flex justify-content-center mt-2">
                    <button class="btn btn-outline-dark">Create Event</button>
                </span>
            </div>
        </form>
    </section>
  </template>
  
  <script>
import { ref } from 'vue';
import {eventService} from '../services/EventService.js'
import { router } from '../router';
  export default {
      setup() {
        const newEvent = ref({})
        async function postEvent(){
            const event = await eventService.postEvent(newEvent.value)
            newEvent.value = {}
            router.push({name: 'Event', params:{eventId: event.id}})
        }
      return {
        newEvent,
        postEvent
      }
    }
  }
  </script>