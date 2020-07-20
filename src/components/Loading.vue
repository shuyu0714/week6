<template>
  <div class="loading-bg flex-ccc" v-show="isShow">
    <div class="spinner-border text-light" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-bg {
  width: 100%;
  height: 100%;
  background-color: #00000099;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
</style>
