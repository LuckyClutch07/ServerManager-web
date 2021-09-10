<template>
    <div class="container"></div>
</template>

<script>
import ServersService from '.../ServersService.js';

export default {
    name: 'FileManager',
    async data () {
        return {
            fileManagers: []
        }
    },
    async created() {
        this.fileManagers = await ServersService.getFileManagers();
    }
}
</script>

<style>

</style>