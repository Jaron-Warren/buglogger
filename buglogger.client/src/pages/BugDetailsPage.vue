<template>
  <div class="BugDetailsPage flex-grow-1 row">
    <div class="col-md-6 mt-3 d-flex flex-column">
      <div>Title:</div>
      <h1>
        {{ bug.title }}
      </h1>
      <div class="mt-auto" v-if="bug.creator">
        <img :src="bug.creator.picture" alt="picture" class="mr-3 my-2">
        {{ bug.creator.name }}
      </div>
      <button class="btn btn-warning mx-auto mt-auto mb-2" v-if="!bug.closed && bug.creatorId === account.id" data-toggle="modal" :data-target="'#editBug' + bug.id">
        Edit Bug Report
      </button>
    </div>
    <div class="col-md-4 d-flex align-items-end">
      <img src="/src/assets/img/computerBug.png" alt="Computer Bug">
      <button class="btn btn-danger ml-3 mb-2" v-if="!bug.closed && bug.creatorId === account.id" @click="closeBug">
        Close Bug Report
      </button>
    </div>
    <div class="col-md-2 d-flex flex-column mt-3">
      <div v-if="bug.createdAt">
        <span>Created: {{ formatDate(bug.createdAt) }}</span>
        <br>
        <span>Last modified: {{ formatDate(bug.updatedAt) }}</span>
      </div>
      <div class="mt-auto">
        Status:<span v-if="!bug.closed" class="text-success text-large font-weight-bold ml-2">Open</span><span v-if="bug.closed" class="text-danger font-weight-bold text-large ml-2">Closed</span>
      </div>
    </div>
    <EditBug :bug="bug" />
    <div class="col-12 border bthick border-info mt-2 bg-secondary">
      <b class="mr-4">Description: </b> {{ bug.description }}
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import { computed, onMounted } from '@vue/runtime-core'
import { router } from '../router'
import Pop from '../utils/Notifier'

export default {
  name: 'BugDetailsPage',
  setup() {
    const state = reactive({
      newBug: {}
    })
    onMounted(async() => {
      // REVIEW why does router.params.id not work? Why does $route.params.id return undefined? (it works in html template)
      try {
        await bugsService.getById(router.currentRoute.value.params.id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug),
      closeBug() {
        // REVIEW confirm doesn't work
        if (Pop.confirm('Are you sure?', 'this can\'t be undone!', 'warning', 'Close forever')) {
          bugsService.close(this.bug.id)
        }
        state.newBug = {}
      },
      formatDate(date) {
        const datesplit = date.slice(0, 10).split('-')
        const datemodded = `${datesplit[1]} / ${datesplit[2]} / ${datesplit[0]}`
        return datemodded
      }
    }
  }
}
</script>
<style>
img{
    max-height: 20vh;
  }
.text-large {
  font-size: 2rem;
}
</style>
