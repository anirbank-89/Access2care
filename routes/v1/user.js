var express = require("express");
var multer = require("multer");

var router = express.Router();

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

/** -------------------- Controllers section -------------------- */
const CLINIC = require("../../controllers/user/Clinic");
/** ------------------ Controllers section end ------------------ */

router.post('/clinic/image-upload', upload.single("image"), CLINIC.imageUpload);
router.post('/clinic/audio-upload', upload.single("audio"), CLINIC.audioUpload);
router.put('/clinic/:id', CLINIC.editClinic);

module.exports = router;