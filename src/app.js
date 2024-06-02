//const {envs}=require('./config/env')
//const {startServer}=require('./server/server')

import {startServer} from './server/server.js'
import {envs} from './config/env.js'

const main=()=>{
    startServer({
        port:envs.PORT,
        public_path:envs.PUBLIC_PATH,
        mongo_url:envs.MONGO_URL,
        pass:envs.PASS,
        db_name:envs.DB_NAME
    })
    
}

(async ()=>{main()})()