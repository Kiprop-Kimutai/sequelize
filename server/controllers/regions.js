const Region = require('../models').Region;
const DeviceGroup = require('../models').DeviceGroup;
const ApiResponse = require('../classes/apiresponse');
module.exports = {
    create(req, res) {
        return Region.create(req.body).then(region => {
            res.status(201).json(new ApiResponse(true, '000', region))
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 401, err));
        });
    },
    update(req, res) {
        return Region.findByPk(req.params.id).then(region => {
            if(!region) {
                res.status(201).json(new ApiResponse(false, 404, 'no such region exists'));
            }
            region.update(req.body, {fields: Object.keys(req.body)}).then(updatedRegion => {
                res.status(201).json(new ApiResponse(true, '000', updatedRegion));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500,err));
        })
    },
    destroy(req, res) {
        return Region.find({
            where: {
                id: req.params.id
            }
        }).then(region => {
            if(!region ) {
                res.status(201).json(new ApiResponse(false, 404, 'no such region exists'));
            }
            region.destroy().then(() => {
                res.status(200).json(new ApiResponse(true, '000', region));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    retrieveOneRegion(req, res) {
        return Region.findByPk(req.params.id, {
            include: [{
                model: DeviceGroup,
                as: 'deviceGroups'
            }]
        }).then(region => {
            if(!region) {
                res.status(201).json(new ApiResponse(false, 404, 'no such region exists'));
            }
            res.status(201).json(new ApiResponse(true, '000', region));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    list(req, res) {
        return Region.findAll({
            include: [{
                model: DeviceGroup,
                as: 'deviceGroups'
            }]
        }).then(regions => {
            res.status(201).json(new ApiResponse(true, '000',regions));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    }
    
}