<template>
  <!-- Modal -->
  <div class="modal"
       :id="'createNewNote'+bug.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <form class="modal-dialog" role="document" @submit.prevent="createNote">
      <div class="modal-content">
        <div class="modal-header bg-dark bcolor bthick">
          <h2 class="modal-title">
            Add Note
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
              <label class="pr-2" for="description">Note</label>
              <textarea type="text"
                        class="form-control"
                        placeholder="Note..."
                        v-model="state.newNote.body"
                        rows="8"
                        minlength="5"
                        maxlength="100"
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
            Add
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
import { notesService } from '../services/NotesService'
import $ from 'jquery'

export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async createNote() {
        await notesService.create(state.newNote)
        state.newNote = {}
        $('#createNewNote' + props.bug.id).modal('hide')
        $('body').removeClass('modal-open')
        $('.modal-backdrop').remove()
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
