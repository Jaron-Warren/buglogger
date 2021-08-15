<template>
  <div class="BugLogItem row bg-secondary">
    <div class="col-4 border border-info bthick">
      {{ bug.title }}
    </div>
    <div class="col-4 border border-info bthick">
      <img :src="bug.creator.picture" alt="picture" class="mr-2">
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
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
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
