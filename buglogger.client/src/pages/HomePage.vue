<template>
  <div class="home flex-grow-1 row justify-content-center">
    <!-- <img src="/src/assets/img/computerBug.png" alt="Computer Bug" class="img-fluid"> -->
    <div class="col-12">
      <div class="row">
        <div class="col-6 ">
          <h1 class="text-secondary ttitle mb-3">
            Bug Log:
          </h1>
        </div>
        <div class="col-6"></div>
        <h4 class="col-4 border-bottom">
          Title
        </h4>
        <h4 class="col-4 border-bottom">
          Reported By
        </h4>
        <h4 class="col-2 border-bottom">
          Status
        </h4>
        <h4 class="col-2 border-bottom">
          Last Modified
        </h4>
      </div>
      <div class="row">
        <div class="col-12 pt-3">
          <h2>No Bugs Reported! <i class="mdi mdi-emoticon-cool"></i></h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
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
}
</style>
