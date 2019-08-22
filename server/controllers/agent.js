const Agent = require('../models').Agent;
const Device = require('../models').Device;
const ApiResponse = require('../classes/apiresponse');
module.exports = {
    create(req, res) {
        return Agent.create(req.body).then(agent => {
            res.status(201).json(new ApiResponse(true, '000', agent))
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 401, err));
        });
    },
    update(req, res) {
        return Agent.findByPk(req.params.id).then(agent => {
            if(!agent) {
                res.status(201).json(new ApiResponse(false, 404, 'no such agent exists'));
            }
            agent.update(req.body, {fields: Object.keys(req.body)}).then(updatedAgent => {
                res.status(201).json(new ApiResponse(true, '000', updatedAgent));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500,err));
        })
    },
    destroy(req, res) {
        return Agent.find({
            where: {
                id: req.params.id,
                msisdn: req.params.msisdn
            }
        }).then(agent => {
            if(!agent) {
                res.status(201).json(new ApiResponse(false, 404, 'no such agent exists'));
            }
            agent.destroy().then(() => {
                res.status(200).json(new ApiResponse(true, '000', agent));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    retrieveOneAgent(req, res) {
        return Agent.findByPk(req.params.id, {
            include: [{
                model: Device,
                as: 'devices'
            }]
        }).then(agent => {
            if(!agent) {
                res.status(201).json(new ApiResponse(false, 404, 'no such agent exists'));
            }
            res.status(201).json(new ApiResponse(true, '000', agent));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    list(req, res) {
        return Agent.findAll({
            include: [{
                model: Device,
                as: 'devices'
            }]
        }).then(agents => {
            res.status(201).json(new ApiResponse(true, '000',agents));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    }
    
}