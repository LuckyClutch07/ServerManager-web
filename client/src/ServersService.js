import axios from 'axios';

class ServersService {
    constructor(arg) {
        this.arg = arg;
    }

    //Get All cached servers.
    getServers() {
        let url = 'http://localhost:5000/api/servers/'+ this.arg;

        return new Promise ((resolve,reject) => {
            if(this.arg == null || this.arg === "")
                reject("FileManager is empty.");

            axios.get(url).then((res) => {
                const data = res.data;

                resolve(data);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }

    async getServerDetails() {
        let servers = await this.getServers();

        servers.forEach(s => {
            if(s.name === this.arg){
                return s;
            }
        });
    }

    getLogs() {
        return new Promise ((resolve, reject) => {
            axios.get('http://localhost:5000/api/servers/console/'+ this.arg).then(res => {
                const data = res.data;

                resolve(data);
            }).catch(err => {
                if(err.response.status === 404){
                    resolve("Couldn't load old server console logs.");
                }
                reject(err);
            });
        });
    }

    static getFileManagers() {
        let url = 'http://localhost:5000/api/servers/fileManagers';

        return new Promise ((resolve,reject) => {
            axios.get(url).then(res => {
                const data = res.data;

                resolve(
                    data
                );
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }
}

export default ServersService;