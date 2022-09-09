<template>
  <div class="container">
    <div class="alert alert-danger text-center mt-5" role="alert">
      <h1>404</h1>
      <p>Oops, it looks like the page you're looking for doesn't exist.</p>
      <button class="btn btn-secondary" @click="goToPeople">Go to people page</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  methods: {
    goToPeople() {
      this.$router.push('/');
    }
  }
}
</script>
