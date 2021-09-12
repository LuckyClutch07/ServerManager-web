<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <div class="container-fluid">
    <router-link class="navbar-brand" :to="{ name: 'Home' }"> ServerManagerUI</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor01">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <router-link class="nav-link active" :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'FileManager' }">File Manager</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name: 'Header',
    data () {
      return {}
    }
}
</script>

<style></style>