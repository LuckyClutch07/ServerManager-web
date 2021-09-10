import axios from 'axios';

class ServersService {
    constructor(fileManager) {
        this.fileManager = fileManager;
    }

    //Get All cached servers.
    getServers() {
        let url = 'http://localhost:5000/api/servers/list/'+ this.fileManager;

        return new Promise ((resolve,reject) => {
            if(this.fileManager == null || this.fileManager === "")
                reject("FileManager is empty.");

            axios.get(url).then((res) => {
                const data = res.data;

                resolve(data[0]);
            })
            .catch((err)=> {
                reject(err);
            })
        });
    }
    static getFileManagers() {
        let url = 'http://localhost:5000/api/servers/list/';

        return new Promise ((resolve,reject) => {
            axios.get(url).then((res) => {
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