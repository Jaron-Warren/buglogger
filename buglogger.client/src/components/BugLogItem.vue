<template>
  <div class="
               bug-log-item
               row
               bg-secondary"
  >
    <div class="col-4 border border-info bthick">
      <router-link :to="{ name: 'BugDetails', params: {id: bug._id} }">
        {{ bug.title }}
      </router-link>
    </div>
    <div class="col-4 border border-info bthick">
      <img :src="bug.creator.picture" alt="picture" class="mr-3 my-2">
      {{ bug.creator.name }}
    </div>
    <div class="col-2 border border-info bthick">
      <span v-if="!bug.closed" class="text-success font-weight-bold">Open</span>
      <span v-if="bug.closed" class="text-danger font-weight-bold">Closed</span>
    </div>
    <div class="col-2 border border-info bthick">
      {{ formatDate(bug.updatedAt) }}
    </div>
  </div>
</template>

<script>
import { AppState } from '../AppState'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      formatDate(date) {
        const datesplit = date.slice(0, 10).split('-')
        const datemodded = `${datesplit[1]} / ${datesplit[2]} / ${datesplit[0]}`
        return datemodded
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 6vh;
}
</style>
