[![Build Status](https://travis-ci.org/LoicSikidi/express-user-referential-crud-api.svg?branch=master)](https://travis-ci.org/LoicSikidi/express-user-referential-crud-api)
[![Coverage Status](https://coveralls.io/repos/github/LoicSikidi/express-user-referential-crud-api/badge.svg)](https://coveralls.io/github/LoicSikidi/express-user-referential-crud-api)

# User Referential CRUD Api

The goal of this project is to provide a simple user referential API.

> POST /users/
>
> GET /users/
>
> GET /users/{username}
>
> PUT /users/{username}
>
> DELETE /users/{username}

# What I Learned

* Develop a Node API with Express framework
* Contract validation input/output using directly the openapi documentation (express-openapi-validate)
* ORM software (knex js)
* & much more

# Technical considerations

## Environment variables

Name               | Description
------------------ | -----------
PORT               | Port listen by the server (default set to *8080*)
DATABASE_TYPE      | The project uses an ORM so we need to define the database's type (default set to *postgresql*)
DATABASE_NAME      | Database's name
DATABASE_USERNAME  | Username used to connect to the database
DATABASE_PASSWORD  | Password of the latter
DATABASE_HOSTNAME  | Database's host (default set to *localhost*)

Default values are defined in *lib/configuration.js*


## Run docker image of the project

1. import the image locally

```cmd
docker pull lsikidi/express-user-referential-crud-api
```

2. run the image

```cmd
docker run \
-p <forwarded_port>:8080 \
-d \
-e "NODE_ENV=production" \
-e "DATABASE_TYPE=<db_type>" \
-e "DATABASE_NAME=<db_name>" \
-e "DATABASE_USERNAME=<db_username>" \
-e "DATABASE_PASSWORD=<db_password>" \
-e "DATABASE_HOSTNAME=<hostname>" \
lsikidi/express-user-referential-crud-api
```

## Install the project locally

In order to facilitate the installation of this project on our local machine. The project provide a *vagrantfile* to automatically provision the virtual machine with all the dependencies needed by the latter.

### Prerequisites

* install virtualbox ([download page](https://www.virtualbox.org/wiki/Downloads))
* install vagrant ([download page](https://www.vagrantup.com/downloads.html))
* install ansible ([documentation page](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html))

### List of the actions

1. Go to the source root arborescence of the project

2. Run this command to provision the VM

```cmd
vagrant up
```

The operation can take some time depending on our internet speed.

3. Connect to the machine

```cmd
vagrant ssh
```

4. Go to the sync link between your local machine & the VM

```cmd
cd /srv/server 
```

5. Hydrate the database with test values

```cmd
npm run hydrate
```

6. Run the project

Remark : the server will listen the port 9080 on your host machine (cf. vagrantfile line: 21).

```cmd
npm run
```

OR

```cmd
npm run watch:server #usefull if you need to dev
```

Project run in this context:
* macOs      mojave (10.14.3)
* python     3.7.0
* ansible    2.7.5
* vagrant    2.2.3
* virtualbox 6.0.0