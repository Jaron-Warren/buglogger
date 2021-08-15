<template>
  <div class="home flex-grow-1 row justify-content-center">
    <!-- <img src="/src/assets/img/computerBug.png" alt="Computer Bug" class="img-fluid"> -->
    <div class="col-6">
      <h1 class="text-secondary">
        Bugs Log:
      </h1>
    </div>
    <div class="col-6"></div>
    <div class="col-6"></div>
    <div class="col-6"></div>
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
