<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid bg-primary pb-5">
    <router-view />
  </main>
  <footer class="bg-grey p-4 border-top border-info d-flex justify-content-around align-items-center">
    <div class=" text-info text-left font-weight-bold mdi mdi-bug-outline ftext">
      Site by Jaron Warren
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
