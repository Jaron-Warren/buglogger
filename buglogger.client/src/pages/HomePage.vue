<template>
  <div class="home flex-grow-1 row justify-content-center">
    <!-- <img src="/src/assets/img/computerBug.png" alt="Computer Bug" class="img-fluid"> -->
    <div class="col-12">
      <div class="row">
        <div class="col-12 ">
          <h1 class="ttitle mb-3">
            Bug Log:
          </h1>
        </div>
        <h4 class="col-4 border-bottom border-info bthick">
          Title
        </h4>
        <h4 class="col-4 border-bottom border-info bthick">
          Reported By
        </h4>
        <h4 class="col-4 col-md-2 border-bottom border-info bthick">
          Status
        </h4>
        <h4 class="col-0 col-md-2 d-none d-md-block border-bottom border-info bthick">
          Last Modified
        </h4>
      </div>
      <div class="row">
        <div class="col-12">
          <h2 v-if="bugs.length == 0">
            No Bugs Reported! <i class="mdi mdi-emoticon-cool"></i>
          </h2>
          <div v-for="b in bugs" :key="b.title">
            <BugLogItem :bug="b" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Notifier'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        bugsService.getAll()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })

    return {
      bugs: computed(() => AppState.bugs)
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
  h4 {
    margin: 0;
  }
}
</style>
