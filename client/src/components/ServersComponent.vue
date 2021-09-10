<template>
  <div class="container">
    <h1>{{ selectedFileManager }} </h1>
    <p class="error" v-if="error">{{ error }}</p>
    <div class="servers-container">
      <div class="servers" v-for="[fm, index] in servers" v-bind:item="fm" v-bind:index="index" v-bind:key="fm">
        <div class="server-container" v-for="[s, index] in servers[fm.index]" v-bind:item="s" v-bind:index="index" v-bind:key="s.name">
          <h2>File-Manager {{ fm }}</h2>
          <h2>Server Name {{ s.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServersService',
  props: ["selectedFileManager", "servers"],
  data() {
    return {
      error: ''
    }
  }
}
</script>