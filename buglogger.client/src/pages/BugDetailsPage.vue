<template>
  <div class="BugDetailsPage flex-grow-1 row justify-content-center" v-if="bug.id">
    <div class="col-md-5 mt-3 d-flex flex-column">
      <div>Title:</div>
      <h1 class="ul">
        {{ bug.title }}
      </h1>
      <div class="mt-auto" v-if="bug.creator">
        <img :src="bug.creator.picture" alt="picture" class="mr-3 my-2">
        {{ bug.creator.name }}
      </div>
      <button class="btn btn-warning mx-auto mt-auto mb-2" v-if="!bug.closed && bug.creatorId === account.id" data-toggle="modal" :data-target="'#editBugModal' + bug.id">
        Edit Bug Report
      </button>
      <EditBug :bug="bug" />
    </div>
    <div class="col-md-4 d-flex align-items-end">
      <img src="/src/assets/img/computerBug.png" alt="Computer Bug">
      <button class="btn btn-danger ml-3 mb-2" v-if="!bug.closed && bug.creatorId === account.id" @click="closeBug">
        Close Bug Report
      </button>
    </div>
    <div class="col-md-3 d-flex flex-column mt-3">
      <div v-if="bug.createdAt">
        <span>Created: {{ formatDate(bug.createdAt) }}</span>
        <br>
        <span>Last modified: {{ formatDate(bug.updatedAt) }}</span>
      </div>
      <div class="mt-auto">
        Status:<span v-if="!bug.closed" class="text-success text-large font-weight-bold ml-2">Open</span><span v-if="bug.closed" class="text-danger font-weight-bold text-large ml-2">Closed</span>
      </div>
    </div>
    <div class="col-11 border bthick border-info pb-5 mt-2 mb-5 bg-secondary">
      <b class="mr-4">Description: </b> {{ bug.description }}
    </div>
    <div class="col-12 d-flex">
      <h2 class="mt-auto">
        Notes:
      </h2>
      <button class="btn btn-success px-5 ml-4 mt-auto mb-2" data-toggle="modal" :data-target="'#createNewNote'+bug.id" v-if="user.isAuthenticated">
        Add
      </button>
    </div>
    <CreateNote :bug="bug" />
    <div class="col-11 border bthick border-info mt-2 pb-4 bg-secondary">
      <div class="row">
        <div v-if="!notes.length == 0">
          <div v-for="n in notes" :key="n.id">
            <NoteItem :note="n" />
          </div>
        </div>
        <div class="col-11" v-else>
          Nothing to show here...
          <br>
          <i class="mdi mdi-comment-processing"></i> add a note!
        </div>
      </div>
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
import { notesService } from '../services/NotesService'

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
        await notesService.getById(router.currentRoute.value.params.id)
      } catch (error) {
        Pop.toast(error)
      }
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      bug: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      async closeBug() {
        if (await Pop.confirm('Are you sure?', 'this can\'t be undone!', 'warning', 'Close forever')) {
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
.ul {
  text-decoration: underline;
}
</style>
