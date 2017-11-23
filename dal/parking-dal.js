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

	static updateParking(data) {
		return new Promise((resolve) => {
			const query = "UPDATE PARKING_DATA SET PARKING_COST = ?, START_TIME=?, END_TIME=?, DESCRIPTION=?, LATITUDE=?, LONGITUDE=?, IS_BOOKED=?, LAST_UPDATE_DATE=? WHERE ID=?";
			const id = data.ID;
			const qArray = [data.PARKING_COST, moment.utc(parseInt(data.START_TIME)).format(), moment.utc(parseInt(data.END_TIME)).format(), data.DESCRIPTION, data.LATITUDE, data.LONGITUDE, data.IS_BOOKED, moment.utc().format(), data.ID];

			connection.query(query, qArray, function (error, results, fields) {
			  if (error) throw error;
			  return resolve(results.insertId);
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

}
module.exports = ParkingDal;
