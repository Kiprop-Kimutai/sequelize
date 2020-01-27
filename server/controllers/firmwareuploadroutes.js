/* eslint-disable no-fallthrough */
var express = require('express');
var csv = require('csvtojson');
var crypto = require('crypto');
const File = require('../models').File;
const Firmware = require('../models').Firmware;
const ApiResponse = require('../classes/apiresponse');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var storage = multer.diskStorage({
	filename: function (req, file, callback) {
		callback(null, file.originalname);
	},
	destination: function (req, file, callback) {
		callback(null, './server/uploads');
	}
});
var uploads = multer({ storage: storage });
router.post('/uploadfirmware', uploads.single('uploads[]', 1), async (req, res) => {
	console.log(req.body);
	if (req.body.name.split('.')[1] != 'rar') {
		res.json(new ApiResponse(false, 300, 'invalid file type'));
	}
	else {
		let md5sum = await getFileMd5Sum(req.body.name);
		console.log(md5sum);
		var file = new File({
			name: req.body.name,
			type: req.body.type,
			md5sum: md5sum
		});
		File.findAll({where: {md5sum: file.md5sum}}).then(files => {
			if( files.length == 0) {
				File.create({name: file.name, type: file.type, md5sum: file.md5sum}).then(() =>{
                    // mould firmware here
                    getCurrentFirmwareVersion(req.body.tag).then(versions => {
                        getbase64File(req.body.name).then(base64 => {
                            let firmware = new Firmware({
                                version: versions[1],
                                model: req.body.model,
                                tag: reject.body.tag,
                                md5sum: result,
                                base64: base64,
                                release_notes: req.body.release_notes,
                                previous_version: versions[0]
                            });
                            res.status(201).json(saveFirmware(firmware));
                        }, err => {
                            res.status(201).json(new ApiResponse(false, 500, err));
                        })
                    })
				}).catch(err => {
                    res.status(201).json(new ApiResponse(false, 500, err));
                })
			}
			else {
				console.log('file exists');
				res.status(201).json(new ApiResponse(true, '000', 'similar file exists'));
			}
		}).catch(err => {
			console.error(err);
			res.status(201).json(new ApiResponse(false, 500, err));
		})
	}
});

//read file and get md5sum
 async function getFileMd5Sum(filename) {
	return new Promise(function (resolve, reject) {
		fs.readFile('./server/uploads/' + filename, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(crypto.createHash('md5').update(data.toString()).digest('hex'));
			}
		});
	});
}
//read file and get base64
function getbase64File(filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile('./server/uploads/' + filename, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data.toString('base64'));
            }
        });
    });
}

async function getCurrentFirmwareVersion(tag) {
    Firmware.max('id').then(id => {
        if (!id) {
            return '1.0.0';
        }
        else {
            Firmware.findByPk(id).then(firmware => {
                let version = firmware.version.split('.');
                switch (tag) {
                    case 'major':
                        let majorVersion = (+version[0] + 1);
                        version[0] = majorVersion.toString();
                        let currentVersion = (version.toString()).replace(/,/g, '.');
                        return [firmware.version, currentVersion];
                    case 'minor':
                        let minorVersion = (+version[1] + 1);
                        version[1] = minorVersion.toString();
                        let currentVersion = (version.toString()).replace(/,/g, '.');
                        return [firmware.version, currentVersion];
                    case 'patch':
                        let patchVersion = (+version[2] + 1);
                        version[2] = patchVersion.toString();
                        let currentVersion = (version.toString()).replace(/,/g, '.');
                        return [firmware.version, currentVersion];
                    default:
                        return null;
                }
            })
        }
    })
}

function saveFirmware(firmware) {
    Firmware.create({
        version: firmware.version, model: firmware.model, tag: firmware.tag, md5sum: firmware.tag, base64: firmware.base64,
        release_notes: firmware.release_notes, previous_version: firmware.previous_version
    }).then(uploadedFirmware => {
        return new ApiResponse(true, '000', 'firmware upload success');
    }, err => {
        return new ApiResponse(false, '303', err);
    })
}
module.exports = router;
