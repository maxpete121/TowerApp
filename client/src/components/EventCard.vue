<template>
    <div style="background-image: url();" class="">
        <div>yes</div>
    </div>
  </template>
  
  <script>
  import { computed, onMounted } from 'vue'
  import { AppState } from '../AppState'
  import { AuthService } from '../services/AuthService'
  import { Event } from '../models/Event'
  export default {
    props: {event: {type: Event, required: true}},
    setup(props) {
        
      return {
      }
    }
  }
  </script>
  
  <style lang="scss" scoped>

</style>