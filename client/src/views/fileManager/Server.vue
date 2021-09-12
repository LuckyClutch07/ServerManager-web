<template>
    <div class="card">
        <b-breadcrumb :items="breadcrumb_items"/>

        <div class="card-header">
            <h5>{{ server }}</h5>
        </div>
        <div class="card-body">
            <div class="scrollable bg-black text-success" id="console">
                <div class="card-text">
                    <p v-html="formatted"/>
                </div>
            </div>
        </div>
        <div class="card-footer text-muted">
            <form @submit.prevent="sendCommand()">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Send commands with out the '/'" v-model="command"/>
                    <button class="btn btn-danger" type="button" @click="shutdown">STOP</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import ServersService from '../../ServersService'
import { io } from "socket.io-client";

var socket = io("http://localhost:3000/", {
    reconnection: true,
    reconnectionDelay: 100,
    reconnectionDelayMax: 1000,
    timeout: 100000,
    path: '/socket'
});

const SERVERS_EVENT = "servers-event";
const SERVER_CONSOLE_OUTPUT = "server-console-output";
const SERVER_DELETE_REQUEST = "server-delete-request";
const WEBUI_INSERT_COMMAND = "webui-insert-command";
const WEBUI_SHUTDOWN_SERVER = "webui-shutdown-server";

export default {
    name: 'Server',
    data () {
        return {
            server: '',
            formatted: '',
            logs: [],
            command: null,
            error: '',
            breadcrumb_items: [{
                text: 'FileManager',
                to: { name: 'FileManager' }
            },{
                text: this.$route.params.fileManager,
                to: { name: 'FileManagerServers', params: { fileManager: this.$route.params.fileManager } },
            },{
                text: this.$route.params.server,
                active: true
            }]
        }
    },
    async created () {
        this.init();
        await this.fetchData();
        this.renderConsole();
    },
    mounted () {
        this.$nextTick(async () => {
            socket.on(SERVERS_EVENT, (data, obj) => {
                let event = data;
                switch (event) {
                case SERVER_CONSOLE_OUTPUT:
                    obj.lines.forEach(line => {
                        this.logs[0].push(line);
                    });
                    return;
                case SERVER_DELETE_REQUEST:
                    var server = obj.server;
                    if(server == this.server)
                        this.$router.push({ name: 'FileManager' })
                    return;
               default:
                    return;
                }
            });
        })
    },
    watch: {
        logs: {
            handler(val) {
                this.renderConsole(val);

                setTimeout(() => {
                    this.scrollToEnd();
                }, 1);
            },
            deep: true
        }
    },
    methods: {
        init: function () {
            this.server = this.$route.params.server
        },
        fetchData: async function () {
            let lines = await new ServersService(this.server).getLogs();

            if(lines.includes("Couldn't load old server console logs.")){
                this.$router.push({ name: 'FileManager' })
                return;
            }

            this.logs.push(lines);
        },
        sendCommand: function() {
            socket.emit(SERVERS_EVENT, WEBUI_INSERT_COMMAND, { "server": this.server, "command": this.command })
            this.command = null;
        },
        shutdown: function() {
            socket.emit(SERVERS_EVENT, WEBUI_SHUTDOWN_SERVER, { "server": this.server });
        },
        renderConsole: function(arg) {
            let formatted = '';

            if(arg){
                arg[0].forEach((line) => {
                    formatted = formatted + line + '<br>';
                })
            } else {
                this.logs[0].forEach((line) => {
                    formatted = formatted + line + '<br>';
                })
            }

            this.formatted = formatted + '<br>';
            return formatted + '<br>';
        },
        scrollToEnd: function () {    	
            var container = this.$el.querySelector("#console");
            container.scrollTop = container.scrollHeight;
        }
    }
}
</script>

<style>
p {
    padding: 0%;
    margin: 0%;
}

.scrollable{
  overflow-y: auto;
  max-height: 35.09rem;
  position : relative;
   bottom:0;
}
</style>