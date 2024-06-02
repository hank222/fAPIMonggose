//require('dotenv').config()
//const {get}=require('env-var');

import env from 'dotenv';
import envvar from 'env-var';
env.config()

export const envs={
    PORT:envvar.get('PORT').required().asPortNumber(),
    PUBLIC_PATH:envvar.get('PUBLIC_PATH').default('public').asString(),
    MONGO_URL:envvar.get('MONGO_URL').asString(),
    DB_NAME:envvar.get('MONGO_DB_NAME').asString(),
    PASS:envvar.get('PASS').asString()

}

