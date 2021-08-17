<template>
  <div class="col-12 mt-3">
    <div class="mb-3 border-bottom border-info" v-if="note">
      <img :src="note.creator.picture" alt="picture" class="mr-2">
      {{ note.creator.name }}
      <i class="mdi mdi-trash-can ml-5 action" @click="destroyNote" v-if="note.creatorId === account.id"></i>
      <p>
        {{ note.body }}
      </p>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { AppState } from '../AppState'
import { computed } from '@vue/runtime-core'
import { notesService } from '../services/NotesService'

export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async destroyNote() {
        await notesService.destroy(props.note.id)
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
