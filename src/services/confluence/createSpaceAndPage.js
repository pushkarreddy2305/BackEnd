import axios from 'axios';
const configEnv = require("../../config");

const config = {
    username: configEnv.username,
    password: configEnv.password,
    baseUrl: "https://rangers.atlassian.net/wiki/rest/api"
    // version: 4 // Confluence major version, optional
};

const axios_config = {
    baseURL:config.baseUrl,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    auth: {
        username: configEnv.username,
        password: configEnv.password
    },
}

exports.createNewSpace = async (key,name,description) => {
    // request body must contain the following
    //------------------------------------------
    //{
    //   "key": ${req.params.spacekey},
    //   "name": ${req.params.spaceName},
    //   "description": {
    //     "plain": {
    //       "value": "qwrt",
    //       "representation": "plain"
    //     }
    //   }
    // }


    let data = {
        key,
        name,
        description:{
            plain:{
                value:description,
                representation:'plain'
            }
        }
    }
    try{

        let result = await axios.post(
            'space',
            data,
            axios_config
        )
        return result.data._links;
    }catch(e){
        console.log("AXIOS ERROR new Space:",e.message);
        return {status:false}
    };
};

exports.createNewPage = async (space,title,pageContent) => {
    // request body must contain the following
    //------------------------------------------

    // {
    //   "space": "NEWSPACE",
    //   "title": "Example space Testing",
    //   "pageContent": "<p>This is a new page with awesome content! Updated</p>"
    //  }

    let data = {
        type:'page',
        title,
        space:{
            key:space,
        },
        body:{
            storage:{
                value:pageContent,
                representation:"storage",
            }
        }
    }

    try{
        let result = await axios.post(
            `content`,
            data,
            axios_config
        );
        return true;
    }catch(e){
        console.log("Axios error create new page:",e.message,e.response.data.message);
        return {status:false};
    }
};
