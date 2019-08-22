const todosControllers = require('../controllers/todos');
const todoItemsController = require('../controllers/todoitems');
const authController = require('../controllers/authentication');
const agentController = require('../controllers/agent');
const devicesController = require('../controllers/device');
const accessoriesController = require('../controllers/accessory');
const filescontroller = require('../controllers/abc');
const express = require('express');
const router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.api_key,
  userProperty: 'payload'
})
router.get('/api', (req,res) => {
    res.status(200).send({message: 'Welcome to Todos API'});
})

router.post('/api/users/register', authController.register);
router.post('/api/users/login', authController.login);
router.post('/api/todos', todosControllers.create);
router.get('/api/todos', auth, todosControllers.list);
router.post('/api/todos/:todoId/items', todoItemsController.create);
router.get('/api/todos/:todoId', todosControllers.retrieve);
router.put('/api/todos/:todoId', todosControllers.update);
router.delete('/api/todos/:todosId', todosControllers.delete);

router.post('api/todos/:todoId/items', todoItemsController.create);
router.put('/api/todos/:todoId/items/:todoItemId',todoItemsController.update);
router.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);

//TMS application routes
router.post('/api/agents/', agentController.create);
router.put('/api/agents/:id', agentController.update);
router.delete('/api/agents/:id/:msisdn', agentController.destroy);
router.get('/api/agents/:id', agentController.retrieveOneAgent);
router.get('/api/agents',agentController.list);
//devices
router.post('/api/devices', devicesController.create);
router.get('/api/devices', auth, devicesController.list);  
router.get('/api/devices/:id',auth, devicesController.retrieveOneDevice);
//accessories
router.post('/api/accessories', accessoriesController.create);
router.get('/api/accessories', accessoriesController.list);
router.put('/api/accessories/:id',accessoriesController.updateAccessory);
router.put('/api/accessories/update/:deviceId',accessoriesController.updateAccessories);
//files
router.use('/api/files',filescontroller);
router.all('/api/todos/:todoId/items', (req, res) =>
res.status(405).send({
  message: 'Method Not Allowed',
}));
module.exports = router;

