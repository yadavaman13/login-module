const router = require("express").Router();
const userC = require("../controller/user")

router.get("/",userC.homepageController);
router.post("/user",userC.userDataController);

module.exports = router;