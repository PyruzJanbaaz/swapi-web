<template>
  <div class="ui-widget-overlay">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SW-Overlay"
}
</script>

<style scoped>
.ui-widget-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  background: #fff;
  opacity: 0.8;
  text-align: center;
  z-index: 100;
  border-radius: 0.5rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
  position: absolute;
  left: 50%;
  right: 50%;
  top: 50%;
  bottom: 50%;
}
</style>