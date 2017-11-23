"use strict";

const parkingDal = require("../dal/parking-dal");

class ParkingService {
	static getParkingList(req, res) {
		parkingDal.getParkingList().then((data) => {
			res.send(data);
		});
	}

	static getAllUsers(req, res) {
		parkingDal.getAllUsers().then((data) => {
			res.send(data);
		});
	}

	static updateParking(req, res) {
		parkingDal.updateParking(req.body).then(() => {
			console.log("Parking updated successfully");
			res.status("200").send();
		})
		.catch((err) => {
			res.status("500").send();
		});	
	}

 	static addParking(req, res) {
		parkingDal.insertParking(req.body).then((id) => {
			console.log("New parking record added");
			res.status("201").send({id});
		})
		.catch((err) => {
			res.status("500").send("Error adding parking record");
		});
	}

}
module.exports = ParkingService;
