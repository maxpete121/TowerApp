<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-dark px-3">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h3 class="d-flex"><h2>🦒</h2>Tower</h3>
      </div>
    </router-link>
    <router-link class="navbar-brand d-flex" v-if="account.id" :to="{ name: 'Create' }">
      <div class="d-flex flex-column align-items-center text-danger me-4 ms-4">
        <h6 class="d-flex align-items-center">Create Event</h6>
      </div>
    </router-link>
    <router-link class="navbar-brand d-flex" v-if="account.id" :to="{ name: 'Profile', params: {profileId: account.id} }">
      <div class="d-flex flex-column align-items-center text-danger">
        <h6 class="d-flex align-items-center">Your Profile</h6>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div>
        <button class="btn text-light" @click="toggleTheme"><i class="mdi" :class="theme == 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"></i></button>
      </div>
      <Login />
    </div>
  </nav>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AppState } from '../AppState';
export default {
  setup() {

    const theme = ref(loadState('theme') || 'light')

    onMounted(() => {
      document.documentElement.setAttribute('data-bs-theme', theme.value)
    })

    return {
      theme,
      toggleTheme() {
        theme.value = theme.value == 'light' ? 'dark' : 'light'
        document.documentElement.setAttribute('data-bs-theme', theme.value)
        saveState('theme', theme.value)
      },
      account: computed(()=> AppState.account),
    }
  },
  components: { Login }
}
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}
</style>
