<template>
  <div class="container">
    <h1>Servers List</h1>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="servers-container">
      <div class="server" v-for="(server, index) in servers" v-bind:item="server" v-bind:index="index" v-bind:key="server.serverName">
        <h2>This boi {{ key }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import ServersService from '../ServersService';

export default {
  name: 'ServersComponent',
  data() {
    return {
      servers: [],
      error: ''
    }
  },
  async created() {
    try {
      this.servers = await ServersService.getServers();
    } catch(err) {
      this.error = err.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
