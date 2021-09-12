<template>
    <div class="row">
        <b-breadcrumb :items="breadcrumb_items"/>
        <h1>{{ fileManager }} </h1>
        <p class="error" v-if="error">{{ error }}</p>
        <div class="servers-container row align-items-center">
          <div class="servers col-lg-6" v-for="(server, index) in servers" v-bind:key="index">
            <div class="card text-white bg-secondary mb-3">
              <div class="card-header">{{ server .address }}:{{ server.port }}</div>
              <div class="card-body">
                <h4 class="card-title text-white text-center text-uppercase">{{ server.name }}</h4>
                <div class="progress text-center">
                  <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" :style="'width:' + server.online + '%'" :aria-valuenow="server.online" aria-valuemin="0" :aria-valuemax="server.max_players"></div>
                  {{ server.online }}/{{ server.max_players }}
                  <router-link class="stretched-link" :to="{ name: 'Server', params: { server: server.name }}"/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import ServersService from '../../ServersService'

export default {
  name: 'FileManagerServers',
  data() {
    return {
      fileManager: this.$route.params.fileManager,
      servers: [],
      error: '',
      breadcrumb_items: [{
        text: 'FileManager',
        to: { name: 'FileManager' }
      },{
        text: this.$route.params.fileManager,
        active: true
      }]
    }
  },
  created() {
    this.getServers();
  },
  methods: {
    async getServers() {
      this.servers = await new ServersService(this.fileManager).getServers();
    }
  }
}
</script>

<style>

</style>