/* eslint-disable no-fallthrough */
var express = require('express');
var csv = require('csvtojson');
var crypto = require('crypto');
const Accessory = require('../models').Accessory;
const Agent = require('../models').Agent;
const Device = require('../models').Device;
const File = require('../models').File;
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
router.get('/api', (req, res) => {
	res.send('ok.....');
});
router.post('/uploadfile', uploads.single('uploads[]', 1), (req, res) => {
	console.log(req.body);
	if (req.body.name.split('.')[1] != 'csv') {
		res.json(new ApiResponse(false, 300, 'invalid file type'));
	}
	else {
		new Promise(function (resolve, reject) {
			getFileMd5Sum(req.body.name).then(function (result) {
				var file = new File({
					name: req.body.name,
					type: req.body.type,
					md5sum: result
				});
				//check if similar md5sum exists in db, discard file
				File.findAll({ where: {md5sum: file.md5sum }}.then((res) => {
					if (res.length == 0) {
						response = new ApiResponse();
						File.create({name: file.name, type: file.type, md5sum: file.md5sum}).then(() =>{
							new Promise((resolve, reject) => {
								csv().fromFile('./server/uploads/' + req.body.name).then((json) => {
									switch (req.body.route) {
										case 'agents':
											res.status(201).json(resolve(insertCollections(Agent, json)));
										break;
										case 'devices':
											res.status(201).json(resolve(insertCollections(Device, json)));
											break;
										case 'accessories':
											res.status(201).json(resolve(insertCollections(Accessory, json)));
											break;
										case 'cycles':
											// resolve(insertCollections(Cell, json));
										case 'beneficiaries':
											// resolve(insertCollections(Village, json));
											break;
										default:
											res.status(201).json(resolve(ApiResponse(false, 310, 'no route supplied')));
											break;
									}
								});
							}).then(() => {
								resolve(new ApiResponse(true, 201, 'File saved successfully'));
							}, err => {console.error(err)});
						}).catch(err => {
								console.error(err);
								reject(new ApiResponse(false, 301, 'Error saving the file'));
						});
					}
					else {
						console.log('File exists');
						//delete file from directory
						/*fs.unlink('./server/uploads/' + req.body.name, (err) => {
							if (err)
								console.error(err);
							else
								console.log('File deleted sucessfully');
						});*/
						resolve(new ApiResponse(false, 305, 'similar file exists'));
					}
				}).catch(err => {
					console.error(err);
					reject(new ApiResponse(false, 300, 'Error saving file'));
				}));
				//console.log(JSON.stringify(response));
			}, function (err) {
				console.log(err);
				console.log('Error getting file md5sum');
				reject(new ApiResponse(false, '310', 'Error getting file md5sum'));
			});
		}).then((resp) => {
			console.log('Will return...');
			res.json(JSON.stringify(resp));
		});
	}
});

//read file and get md5sum
function getFileMd5Sum(filename) {
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

function insertCollections(collection, docs) {
	// eslint-disable-next-line no-unused-vars
	console.log('--------------');
	console.log(docs);
	collection.bulkCreate(docs).then(() => {
		return new ApiResponse(true, '000', 'file upload success')
	}, (err) => {
		console.log(err.error);
		return new ApiResponse(false, 400, err);
	});/*.catch(err => {
		console.log('----------');
		console.log(err);
		return new ApiResponse(false, 400, err);
	});*/
}
module.exports = router;
