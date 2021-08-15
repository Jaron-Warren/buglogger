<template>
  <!-- Modal -->
  <div class="modal"
       id="createNewBug"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <form class="modal-dialog" role="document" @submit.prevent="createBug">
      <div class="modal-content">
        <div class="modal-header bg-dark bcolor bthick">
          <h2 class="modal-title">
            Report Bug
          </h2>
          <button type="button" class="close text-light" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body bg-dark">
          <div class="container-fluid">
            <div class="mb-3" v-if="user.isAuthenticated">
              <img :src="account.picture" alt="picture" class="mr-2">
              {{ account.name }}
            </div>
            <div class="form-group">
              <label class="pr-2" for="title">Title:</label>
              <input type="text"
                     class="form-control"
                     placeholder="Title..."
                     v-model="state.newBug.title"
                     required
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="description">Description</label>
              <textarea type="text"
                        class="form-control"
                        placeholder="Bug description..."
                        v-model="state.newBug.description"
                        rows="8"
                        required
              />
            </div>
          </div>
        </div>
        <div class="modal-footer bg-dark bcolor bthick">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Close
          </button>
          <button type="submit" class="btn btn-success">
            create
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'

export default {
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      createBug() {
        bugsService.create(state.newBug)
        state.newBug = {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  height: 6vh;
}
.bcolor {
  border-color: #6C63FF!important;
}
</style>
