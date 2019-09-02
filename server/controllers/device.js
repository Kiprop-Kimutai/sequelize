const Device = require('../models').Device;
const Accessory = require('../models').Accessory;
const ApiResponse = require('../classes/apiresponse');
module.exports = {
    create(req, res) {
        return Device.create(req.body).then(device => {
            res.status(201).json(new ApiResponse(true, '000', device));
        }).catch(err => {
            res.status(200).json(new ApiResponse(false, 500, err));
        })
    },
    list(req,res) {
        return Device.findAll({
            include: [{
                model: Accessory,
                as: 'accessories'
            }]
        }).then(devices => {
            if(!devices) {
                res.status(200).json(new ApiResponse(false,404, 'devices not found'));
            }
            res.status(200).json(new ApiResponse(true, '000',devices));
        }).catch(err => {
            console.error(err);
            res.status(200).json(new ApiResponse(false,500,err));
        })
    },
    retrieveOneDevice(req, res) {
        return Device.findByPk(req.params.id, {
            include: [{
                model: Accessory,
                as: 'accessories'
            }]
        }).then(device => {
            if(!device) {
                res.status(201).json(new ApiResponse(false, 404, 'no such agent exists'));
            }
            res.status(201).json(new ApiResponse(true, '000', device));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    update(req, res) {
        return Device.findByPk(req.params.id).then(device => {
            if(!device) {
                res.status(201).json(new ApiResponse(false, 404, 'no such device exists'));
            }
            device.update(req.body, {fields: Object.keys(req.body)}).then(updatedDevice => {
                res.status(201).json(new ApiResponse(true, '000', updatedDevice));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500,err));
        })
    },
    destroy(req, res) {
        return Device.findOne({
            where: {
                id: req.params.id,
                serialno: req.params.serialno
            }
        }).then(device => {
            if(!device) {
                res.status(201).json(new ApiResponse(false, 404, 'no such device exists'));
            }
            device.destroy().then(() => {
                res.status(200).json(new ApiResponse(true, '000', device));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    
}