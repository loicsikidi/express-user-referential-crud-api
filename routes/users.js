const router = require('express').Router();
const validator = require('../lib/utils').openApiValidator();
const u = require('../lib/utils');
const ref = require('../lib/referential');
const userController = require('../controllers/users');
const statusController = require('../controllers/statuses');
const { NotFoundError, DuplicateError } = require('../lib/errors');
const databaseType = require('../lib/configuration').DATABASE_TYPE;


router.get('/', validator.validate("get", "/users"), function(req, res, next) {
  let usersResponse;
  return userController.getAllUsers(req.query.limit, req.query.offset)
  .then((users) => {
    usersResponse = users;
    return userController.countAllUsers();
  })
  .then((countUsers) => { 
    res.send(u.mapToCollectionStructure(req.query.limit, req.query.offset, parseInt(countUsers[0].count), 'users', usersResponse));
  })
  .catch((err) => { next(err); });
});

router.post('/', validator.validate("post", "/users"), function(req, res, next) {
  let user = req.body;
  return statusController.getStatusByName(req.body.status)
  .then((status) => {
    user.status_id = status.id;
    return userController.addUser(user);
  })
  .then((newUser) => {
    res.header('Location' , `/users/${newUser[0].username}`)
    .status(201)
    .send();
  })
  .catch((err) => {
    if(err.code && err.code === ref.DB_ERRORS[databaseType].DUPLICATE_KEY){
      throw new DuplicateError('User already exists');
    }
    next(err); 
  })
  .catch((err) => { next(err); });
});

router.get('/:username', validator.validate("get", "/users/{username}"), function(req, res, next) {
  return userController.getUserByEmail(req.params.username)
  .then((user) => {
    if(!user){
      throw new NotFoundError('User does not exist');
    }
    res.send(user);
  })
  .catch((err) => { next(err); });
});

router.put('/:username', validator.validate("put", "/users/{username}"), function(req, res, next) {
  let user = req.body;
  return statusController.getStatusByName(req.body.status)
  .then((status) => {
    user.status_id = status.id;
    return userController.updateUser(req.params.username, user)
  }) 
  .then((updatedUser) => {
    if(updatedUser.length === 0){
      throw new NotFoundError('User does not exist');
    }
    updatedUser = updatedUser[0];
    updatedUser.status = user.status;
    //TODO: remove this part because of the code smell...
    delete updatedUser.id;
    delete updatedUser.status_id;
    res.status(200)
    .send(updatedUser);
  })
  .catch((err) => { next(err); });
});

router.delete('/:username', validator.validate("delete", "/users/{username}"), function(req, res, next) {
  return userController.deleteUser(req.params.username)
  .then((response) => {
    if(response.length === 0){
      throw new NotFoundError('User does not exist');
    }
    res.status(204)
    .send();
  })
  .catch((err) => { next(err); });
});

module.exports = router;