# employers-holding-api
Employer's Holding Rest API

# Dependencies

* `npm 6.9.0`
* `node 10.16.0`

# Setup
* Clone project

 `git clone https://github.com/repo.git`

 * Go to the project directory

  `cd employers-holding-api`

* Install prerequisite packages

`npm install`

* Start the server

`npm start`

* Make changes

    Edit routing files within `/src/routes` to expose new API endpoints

* Installing Mongo

    Go [here](https://www.mongodb.com/download-center/community?jmp=docs) and download the installer, then run it.

# End Points
## Users
* GET `/user` will return all users
* GET `/user/:name` will return data for user based on username
* POST `/user` send with groups, roles, and username. groups and roles are optional for now.

## Projects
* GET `/project` will return all projects
* GET `/project/:search` will return projects with description or name matching :search
* POST `/project` send with name and description.
* PUT `/project` send with id(the document id, in mongo \_id), name(this is the new name), description(this is the new description)