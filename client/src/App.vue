<template>
  <div id="app">
    <Header />
    <div class="container-fluid">
      <br/>
      <router-view />
      <br/>
    </div>
  </div>
</template>

<script>
import "bootswatch/dist/cyborg/bootstrap.min.css";
import Header from './views/Header.vue'

export default {
  name: 'App',

  components: {
    Header
  }
}
</script>