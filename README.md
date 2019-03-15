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

* install vagrant
* install ansible
* install virtualbox

## Actions

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

5. Initiate the value on the database (TODO: ansible)

```cmd
./node_modules/.bin/knex migrate:latest --env  development

./node_modules/.bin/knex seed:run --env  development
```

6. Run the project (development purpose)

```cmd
./node_modules/.bin/nodemon app.js -L
```

Operation perform in this context:
* macOs
* python     3.7.0
* ansible    2.7.5
* vagrant    2.2.3
* virtualbox 6.0.0
