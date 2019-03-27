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

# Installation

In order to facilitate the installation of this project on our local machine. The project provide a *vagrantfile* to automatically provision the virtual machine with all the dependencies needed by the latter.

## Prerequisites

* install virtualbox ([download page](https://www.virtualbox.org/wiki/Downloads))
* install vagrant ([download page](https://www.vagrantup.com/downloads.html))
* install ansible ([documentation page](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html))

## List of the actions

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

5. Initiate the value on the database (development purpose)

```cmd
npm run dev:init_db
```

6. Run the project (development purpose)

```cmd
npm run watch:server
```

Project run in this context:
* macOs      mojave (10.14.3)
* python     3.7.0
* ansible    2.7.5
* vagrant    2.2.3
* virtualbox 6.0.0

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

Default values are defined in */lib/configuration.js*
