const Firmware = require('../models').Firmware;
const ApiResponse = require('../classes/apiresponse');
module.exports = {
    create(req, res) {
        return Firmware.create(req.body).then(firmware => {
            res.status(201).json(new ApiResponse(true, '000', firmware))
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 401, err));
        });
    },
    update(req, res) {
        return Firmware.findByPk(req.params.id).then(firmware => {
            if(!firmware) {
                res.status(201).json(new ApiResponse(false, 404, 'no such firmware exists'));
            }
            firmware.update(req.body, {fields: Object.keys(req.body)}).then(updatedFirmware => {
                res.status(201).json(new ApiResponse(true, '000', updatedFirmware));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500,err));
        })
    },
    destroy(req, res) {
        return Firmware.find({
            where: {
                id: req.params.id
            }
        }).then(firmware => {
            if(!firmware) {
                res.status(201).json(new ApiResponse(false, 404, 'no such firmware exists'));
            }
            firmware.destroy().then(() => {
                res.status(200).json(new ApiResponse(true, '000', firmware));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    retrieveOneFirmware(req, res) {
        return Firmware.findByPk(req.params.id).then(firmware => {
            if(!firmware) {
                res.status(201).json(new ApiResponse(false, 404, 'no such firmware exists'));
            }
            res.status(201).json(new ApiResponse(true, '000', firmware));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    list(req, res) {
        return Firmware.findAll().then(firmware => {
            res.status(201).json(new ApiResponse(true, '000',firmware));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    }
    
}