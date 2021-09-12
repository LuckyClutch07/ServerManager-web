<template>
    <div class="row">
        <b-breadcrumb :items="breadcrumb_items"/>
        <div class="col-4">
            <div class="row">
                <div class="list-group">
                    <div class="col-xs-3">
                        <router-link 
                            type="button" 
                            v-for="fm in this.fileManagers" 
                            v-bind:key="fm" 
                            :to="{ name: 'FileManagerServers', params: { fileManager: fm }}" 
                            class="list-group-item"
                        >
                            {{fm}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8">

        </div>
    </div>
</template>

<script>
import ServersService from '../../ServersService';
import FileManagerServers from './FileManagerServers.vue';

export default {
    name: 'FileManager',
    component: {
        FileManagerServers
    },
    data () {
        return {
            selectedManager: '',
            fileManagers: [],
            breadcrumb_items: [{
                text: 'FileManager',
                active: true
            }]
        }
    },
    created() {
        this.fetchData();
        this.selectedManager = this.fileManagers[0];
    },
    methods: {
        async fetchData () {
            this.fileManagers = await ServersService.getFileManagers();
        },
        selectManager(fileManager) {
            this.selectManager = fileManager;
        }
    }
}
</script>

<style>

</style>