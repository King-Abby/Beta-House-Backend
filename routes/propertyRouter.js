const router = require("express").Router();

const handleGetAllProperties = require("../controllers/propertyController");

router.get("/", handleGetAllProperties);

module.exports = router;
