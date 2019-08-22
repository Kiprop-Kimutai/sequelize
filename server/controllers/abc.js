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
router.post('/uploadfile', uploads.single('uploads[]', 1), async (req, res) => {
	console.log(req.body);
	if (req.body.name.split('.')[1] != 'csv') {
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
					csv().fromFile('./server/uploads/' + req.body.name).then((json) => {
						console.log(json);
						switch (req.body.route) {
							case 'agents':
								res.status(201).json(insertCollections(Agent, json));
								break;
							case 'devices':
								res.status(201).json(insertCollections(Device, json));
								break;
							case 'accessories':
								res.status(201).json(insertCollections(Accessory, json));
								break;
							case 'cycles':
								// resolve(insertCollections(Cell, json));
							case 'beneficiaries':
								// resolve(insertCollections(Village, json));
								break;
							default:
								res.status(201).json((ApiResponse(false, 310, 'no route supplied')));
								break;
						}
					});
				}).catch(err => {})
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
	 console.log('init...');
	return new Promise(function (resolve, reject) {
		fs.readFile('./server/uploads/' + filename, (err, data) => {
			if (err) {
				console.log.log(err);
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
	collection.bulkCreate(docs).then(() => {
		return new ApiResponse(true, '000', 'file upload success')
	}).catch(err => {
		console.error(err);
		return new ApiResponse(false, 500, err);
	});
}
module.exports = router;
