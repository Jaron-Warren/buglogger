<template>
  <!-- Modal -->
  <div class="modal"
       :id="'editBug' + bug.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <form class="modal-dialog" role="document" @submit.prevent="editBug">
      <div class="modal-content">
        <div class="modal-header bg-dark bcolor bthick">
          <h2 class="modal-title">
            Edit
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
                     v-model="state.edit.title"
                     minlength="4"
                     maxlength="20"
                     required
              >
            </div>
            <div class="form-group">
              <label class="pr-2" for="description">Description</label>
              <textarea type="text"
                        class="form-control"
                        placeholder="Bug description..."
                        v-model="state.edit.description"
                        rows="8"
                        minlength="20"
                        maxlength="300"
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
            Confirm
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'

export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  // REVIEW passing props into state? I tried to put the initial value of v-model as bug.title and description.
  setup() {
    const state = reactive({
      edit: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async editBug() {
        try {
          AppState.activeBug.title = state.edit.title
          AppState.activeBug.description = state.edit.description
          state.edit = {}
          bugsService.editbug(AppState.activeBug)
        } catch (error) {
          Pop.toast(error)
        }
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
