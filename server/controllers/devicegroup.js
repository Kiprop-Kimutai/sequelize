const DeviceGroup = require('../models').DeviceGroup;
const ApiResponse = require('../classes/apiresponse');
module.exports = {
    create(req, res) {
        return DeviceGroup.create(req.body).then(group => {
            res.status(201).json(new ApiResponse(true, '000', group))
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 401, err));
        });
    },
    update(req, res) {
        return DeviceGroup.findByPk(req.params.id).then(group => {
            if(!group) {
                res.status(201).json(new ApiResponse(false, 404, 'no such group exists'));
            }
            console.log("=====>", group);
            group.update(req.body, {fields: Object.keys(req.body)}).then(updatedGroup => {
                res.status(201).json(new ApiResponse(true, '000', updatedGroup));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500,err));
        })
    },
    destroy(req, res) {
        return DeviceGroup.find({
            where: {
                id: req.params.id
            }
        }).then(group => {
            if(!group) {
                res.status(201).json(new ApiResponse(false, 404, 'no such group exists'));
            }
            group.destroy().then(() => {
                res.status(200).json(new ApiResponse(true, '000', group));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    retrieveOneDeviceGroup(req, res) {
        return DeviceGroup.findByPk(req.params.id).then(group => {
            if(!group) {
                res.status(201).json(new ApiResponse(false, 404, 'no such group exists'));
            }
            res.status(201).json(new ApiResponse(true, '000', group));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    list(req, res) {
        return DeviceGroup.findAll().then(groups => {
            res.status(201).json(new ApiResponse(true, '000',groups));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    }
    
}