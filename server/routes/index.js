const todosControllers = require('../controllers/todos');
const todoItemsController = require('../controllers/todoitems');
const authController = require('../controllers/authentication');
const agentController = require('../controllers/agent');
const beneficiaryController = require('../controllers/beneficiary');
const devicesController = require('../controllers/device');
const accessoriesController = require('../controllers/accessory');
const filescontroller = require('../controllers/abc');
const uploadFirmwareController = require('../controllers/firmwareuploadroutes');
const firmwareController = require('../controllers/firmware');
const regionsController = require('../controllers/regions');
const deviceGroupController = require('../controllers/devicegroup');
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

//beneficiary routes
router.post('/api/beneficiaries/', beneficiaryController.create);
router.put('/api/beneficiaries/:id', beneficiaryController.update);
router.delete('/api/beneficiaries/:id', beneficiaryController.destroy);
router.get('/api/beneficiaries/:id', beneficiaryController.retrieveOneBeneficiary);
router.get('/api/beneficiaries',beneficiaryController.list);
//devices
router.post('/api/devices', devicesController.create);
router.get('/api/devices', auth, devicesController.list);
router.get('/api/devices/:id',auth, devicesController.retrieveOneDevice);
router.put('/api/devices/:id',auth, devicesController.update);
router.delete('/api/devices/:id/:serialno', devicesController.destroy);
//accessories
router.post('/api/accessories', accessoriesController.create);
router.get('/api/accessories', accessoriesController.list);
router.put('/api/accessories/:id',accessoriesController.updateAccessory);
router.put('/api/accessories/update/:deviceId',accessoriesController.updateAccessories);
// firmware routes
router.post('/api/firmware/', firmwareController.create);
router.put('/api/firmware/:id', firmwareController.update);
router.delete('/api/firmware/:id', firmwareController.destroy);
router.get('/api/firmware/:id', firmwareController.retrieveOneFirmware);
router.get('/api/firmware',firmwareController.list);
// region routes
router.post('/api/region/', regionsController.create);
router.put('/api/region/:id', regionsController.update);
router.delete('/api/region/:id', regionsController.destroy);
router.get('/api/region/:id', regionsController.retrieveOneRegion);
router.get('/api/region',regionsController.list);
// device group routes
router.post('/api/devicegroup/', auth, deviceGroupController.create);
router.put('/api/devicegroup/:id', auth, deviceGroupController.update);
router.delete('/api/devicegroup/:id', auth, deviceGroupController.destroy);
router.get('/api/devicegroup/:id', deviceGroupController.retrieveOneDeviceGroup);
router.get('/api/devicegroup', auth, deviceGroupController.list);
//files
router.use('/api/files',filescontroller);
router.use('/api/firmware/', uploadFirmwareController);
router.all('/api/todos/:todoId/items', (req, res) =>
res.status(405).send({
  message: 'Method Not Allowed',
}));
module.exports = router;

