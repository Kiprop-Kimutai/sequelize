const Beneficiary = require('../models').Beneficiary;
const ApiResponse = require('../classes/apiresponse');
module.exports = {
    create(req, res) {
        return Beneficiary.create(req.body).then(beneficiary => {
            res.status(201).json(new ApiResponse(true, '000', beneficiary));
        }).catch(err => {
            res.status(200).json(new ApiResponse(false, 500, err));
        })
    },
    list(req,res) {
        return Beneficiary.findAll({}).then(beneficiaries => {
            if(!beneficiaries) {
                res.status(200).json(new ApiResponse(false,404, 'beneficiary not found'));
            }
            res.status(200).json(new ApiResponse(true, '000',beneficiaries));
        }).catch(err => {
            console.error(err);
            res.status(200).json(new ApiResponse(false,500,err));
        })
    },
    retrieveOneBeneficiary(req, res) {
        return Beneficiary.findByPk(req.params.id).then(beneficiary => {
            if(!beneficiary) {
                res.status(201).json(new ApiResponse(false, 404, 'no such beneficiary exists'));
            }
            res.status(201).json(new ApiResponse(true, '000', beneficiary));
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },
    update(req, res) {
        return Beneficiary.findByPk(req.params.id).then(beneficiary => {
            if(!beneficiary) {
                res.status(201).json(new ApiResponse(false, 404, 'no such beneficiary exists'));
            }
            beneficiary.update(req.body, {fields: Object.keys(req.body)}).then(updatedBeneficiary => {
                res.status(201).json(new ApiResponse(true, '000', updatedBeneficiary));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500,err));
        })
    },
    destroy(req, res) {
        return Beneficiary.find({
            where: {
                id: req.params.id
            }
        }).then(beneficiary => {
            if(!beneficiary) {
                res.status(201).json(new ApiResponse(false, 404, 'no such beneficiary exists'));
            }
            beneficiary.destroy().then(() => {
                res.status(200).json(new ApiResponse(true, '000', beneficiary));
            }).catch(err => {
                res.status(200).json(new ApiResponse(false, 400, err));
            })
        }).catch(err => {
            res.status(201).json(new ApiResponse(false, 500, err));
        })
    },

}