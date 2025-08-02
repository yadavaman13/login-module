const router = require("express").Router();
const userC = require("../controller/user")

router.get("/",userC.homepageController);
router.post("/user",userC.userDataController);
router.get("/useralldata",userC.userAllDataController);

module.exports = router;