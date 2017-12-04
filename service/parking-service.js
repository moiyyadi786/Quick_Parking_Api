"use strict";

const parkingDal = require("../dal/parking-dal");
const ObjectMapper = require("../behavior/object-mapper");

class ParkingService {
	static getParkingList(req, res) {
		parkingDal.getParkingList().then((data) => {
			res.send(data);
		}).catch((err) => {
			res.status("500").send();
		});	
	}

	static getAllUsers(req, res) {
		parkingDal.getAllUsers().then((data) => {
			res.send(data);
		}).catch((err) => {
			res.status("500").send();
		});	
	}

	static addParking(req, res) {
		const transformedObj = ObjectMapper.mapObject(req.body, );
	
		parkingDal.insertParking(transformedObj).then((id) => {
			console.log("New parking record added");
			res.status("201").send({id});
		})
		.catch((err) => {
			res.status("500").send("Error adding parking record");
		});
	}

	static updateParking(req, res) {
		const parkingData = req.body;
		const parkingId = req.params.id;

		parkingDal.updateParking(parkingData, parkingId).then(() => {
			console.log("Parking updated successfully");
			res.status("200").send();
		})
		.catch((err) => {
			res.status("500").send();
		});	
	}

	static requestParking(req, res) {
		const body = req.body;

		parkingDal.requestParking().then((data) => {
			res.status("201").send(data);
		}).catch((err) => {
			res.status("500").send();
		});
	}

	static updateRequest(req, res) {
		const data = req.body.data;
		const id = req.params.id;

		parkingDal.updateRequest().then((data) => {
			res.status("200").send(data);
		}).catch((err) => {
			res.status("500").send();
		});
	}

	static allotParking(req, res) {
		const data = req.body;
		const requestId = req.params.requestId;

		parkingDal.allotParking().then((data, requestId) => {
			res.status("200").send(data);
		}).catch((err) => {
			res.status("500").send();
		});		
	}
}
module.exports = ParkingService;
