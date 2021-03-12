const express = require('express');
const router = express.Router();
const pdfController = require("../controller/pdf.controller")

// get pdf data
router.post("/getPdfData", pdfController.getPdfData)

// add pdf data
router.post("/addData", pdfController.addData)


module.exports = router;