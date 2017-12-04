const mysql = require("mysql");
const moment = require("moment");
const config = require("../config/" + (process.env.NODE_ENV || "development") + ".js");
const connection = mysql.createConnection(config.db);
connection.connect();

class ParkingDal {
	static getParkingList(lat, long) {
		return new Promise((resolve) => {
			connection.query("SELECT * FROM PARKING_DATA", function (error, results, fields) {
			  if (error) throw error;
			  return resolve(results);
			});
		});
	}

	static getAllUsers() {
		return new Promise((resolve) => {
			connection.query("SELECT * FROM USER", function (error, results, fields) {
			  if (error) throw error;
			  return resolve(results);
			});
		});	
	}

	static insertParking(data) {
		return new Promise((resolve) => {
			const query = "INSERT INTO PARKING_DATA SET ?";

			connection.query(query, data, function (error, results, fields) {
			  if (error) throw error;
			  return resolve(results.insertId);
			});
		});	
	}

	static updateParking(data, id) {
		return new Promise((resolve) => {
			const query = "UPDATE PARKING_DATA SET PARKING_COST = ?, START_TIME=?, END_TIME=?, DESCRIPTION=?,\
			LATITUDE=?,LONGITUDE=?, IS_BOOKED=?, LAST_UPDATE_DATE=? WHERE ID=?";
			const qArray = [data.PARKING_COST, moment.utc(parseInt(data.START_TIME)).format(), 
				moment.utc(parseInt(data.END_TIME)).format(), data.DESCRIPTION, data.LATITUDE, data.LONGITUDE, 
				data.IS_BOOKED, moment.utc().format(), id];

			connection.query(query, qArray, function (error, results, fields) {
			  if (error) throw error;
			  return resolve();
			});
		});	
	}

	static requestParking(data) {
		return new Promise((resolve) => {
			connection.query("INSERT INTO PARKING_REQUEST SET ?", function (error, results, fields) {
			  if (error) throw error;
			  return resolve(results).insertId;
			});
		});
	}

	static updateRequest(data, id) {
		return new Promise((resolve) => {
			const query = "UPDATE PARKING_REQUEST SET COMMENTS=? WHERE ID=?";
			const qArray = [data.comments, id];

			connection.query(query, qArray, function (error, results, fields) {
			  if (error) throw error;
			  return resolve();
			});
		});			
	}
	
	static allotParking(data, id) {
		return new Promise((resolve) => {
			const storedProc = "CALL ALLOT_PARKING(?, ?, ?)";
			const qArray = [data.PARKING_ID, data.NUMBER_OF_SPOTS, id];

			connection.query(query, qArray, function (error, results, fields) {
			  if (error) throw error;
			  return resolve();
			});
		});			
	}
}
module.exports = ParkingDal;
