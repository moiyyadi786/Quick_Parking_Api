var express = require("express");
var router = express.Router();
const parkingService = require("../service/parking-service");

/* GET home page. */
router.get("/list/:lat/:log/", function(req, res, next) {
  
  //res.render('index', { title: 'Express' });
});

router.get("/users", parkingService.getAllUsers);

// Get all parkings
router.get("/all", parkingService.getParkingList);

// Parking CRUD
router.put("/new", parkingService.addParking);
router.post("/update/:id", parkingService.updateParking);
//router.delete("/delete/:id", parkingService.deleteParking);

// Parking request crud
router.put("/requestparking", parkingService.requestParking);
router.post("/updaterequest/:id", parkingService.updateRequest);
//router.delete("/deleteRequest/:id", parkingService.deleteRequest);

// Allot parking
router.post("/allotparking/:requestId", parkingService.allotParking);

module.exports = router;
