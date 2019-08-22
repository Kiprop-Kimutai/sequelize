const Accessory = require('../models').Accessory;
const ApiResponse = require('../classes/apiresponse');

module.exports = {
    create(req, res) {
        return Accessory.create(req.body).then(accessory => {
            res.status(201).json(new ApiResponse(true, '000', accessory));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    list(req, res) {
        return Accessory.findAll().then(accessories => {
            res.status(200).json(new ApiResponse(true, '000', accessories));
        }).catch(err => {
            res.status(200).json(new ApiResponse(false, 500, err));
        })
    },
    updateAccessory(req, res) {
        return Accessory.findByPk(req.params.id).then(accessory => {
            if(!accessory) {
                res.status(201).json(new ApiResponse(false, 400, 'no accessory matches id'));
            }
            accessory.update(req.body, {fields:Object.keys(req.body)}).then(updatedAgent => {
                res.status(201).json(new ApiResponse(true, '000', updatedAgent));
            }).catch(err => {
                res.status(201).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
     updateAccessories(req, res) {
        return Accessory.update({active: req.body.active},{where: {deviceId: req.params.deviceId}}).then(updatedAccessories => {
            res.status(201).json(new ApiResponse(true, '000', updatedAccessories));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    }
}
