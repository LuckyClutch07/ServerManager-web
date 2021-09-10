<template>
  <div id="app">
    <router-view />
    <div class="container">
      <div class="form-group">
      <label for="filemanagers" class="form-label mt-4">File Manager</label>
      <select class="form-select" v-model="selectedFileManager" id="filemanagers">
        <option v-for="fm in fileManagers" v-bind:key="fm">{{ fm }}</option>
      </select>
    </div>
      <div class="container-fluid">
        <h1>{{ selectedFileManager }} </h1>
        <p class="error" v-if="error">{{ error }}</p>
        <div class="servers-container row align-items-center">
          <div class="servers col" v-for="(server, index) in servers" v-bind:item="server" v-bind:index="index" v-bind:key="server.port">
            <div class="card text-white bg-primary mb-3">
              <div class="card-header">{{ server .address }}:{{ server.port }}</div>
              <div class="card-body">
                <h4 class="card-title text-white text-center text-uppercase">{{ server.name }}</h4>
                <div class="progress">
                  <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" :style="'width:' + server.online + '%'" :aria-valuenow="server.online" aria-valuemin="0" :aria-valuemax="server.max_players"></div>
                  {{ server.online }}/{{ server.max_players }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'FileManagerServers',
    props: ['selectedFileManager', 'servers'],
    data () {

    }
}
</script>

<style>

</style>