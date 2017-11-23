var express = require("express");
var router = express.Router();
const parkingService = require("../service/parking-service");

/* GET home page. */
router.get("/list/:lat/:log/", function(req, res, next) {
  
  //res.render('index', { title: 'Express' });
});

router.get("/users", parkingService.getAllUsers);
router.get("/all", parkingService.getParkingList);

router.put("/new", parkingService.addParking);
router.post("/update", parkingService.updateParking);
module.exports = router;
