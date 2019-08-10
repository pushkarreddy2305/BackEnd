const agent = require( 'superagent');
const config = require('../../config.js');

class JiraConnectorService {
    constructor(){

        this.jiraApiURl=config.jiraURL;
    }


    createProject(project){ 
       
        return agent.post(`${this.jiraApiURl}/project`).send(project).set('Authorization',this.getBasicCredentials())
    }

    deleteProject(key){ return agent.delete(`${this.jiraApiURl}/project/${key}`).set('Authorization',this.getBasicCredentials())}

    updateProject(key,project){ return agent.put(`${this.jiraApiURl}/project/${key}`).send(project).set('Authorization',this.getBasicCredentials())}

    getProjectByKey(key){ return  agent.get(`${this.jiraApiURl}/project/${key}`).set('Authorization',this.getBasicCredentials())}

    getAllProjects(){ return    agent.get(`${this.jiraApiURl}/project`).set('Authorization',this.getBasicCredentials())}


    getBasicCredentials(){
        const enCodedToken = Buffer.from("Sharath:Wilmington@1995").toString('base64')
        return `Basic ${enCodedToken}`
    }


}

module.exports =  JiraConnectorService
