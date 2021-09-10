import axios from 'axios';

const url = "ws://localhost:3000/";


class ServersService {
    //Get All cached servers.
    static getServers() {
        return async function() {
            try {
                //const res = await axios.get(url);
                //const data = res.data;
                
                return await (await axios.get(url)).data;
            } catch (err) {
                return err;
            }
        };
    }

    static addServer(){

    }


}

export default ServersService;