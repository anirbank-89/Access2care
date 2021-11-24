var express = require("express");
var multer = require("multer");

var router = express.Router();

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

/** -------------------- Controllers section -------------------- */
const CLINIC = require("../../controllers/user/Clinic");
const CLINIC_SLOT = require("../../controllers/user/slots/ClinicSlotAction");
/** ------------------ Controllers section end ------------------ */

router.post('/clinic/image-upload', upload.single("image"), CLINIC.imageUpload);
router.post('/clinic/audio-upload', upload.single("audio"), CLINIC.audioUpload);
router.get('/clinic/:id', CLINIC.getClinicById);
router.put('/clinic/:id', CLINIC.editClinic);
router.put('/clinic/update-password/:id', CLINIC.updatePassword);

router.post('/slot', CLINIC_SLOT.createSlots);
router.get('/slot', CLINIC_SLOT.viewAllSlotsPerDay);
router.delete('/slot', CLINIC_SLOT.deleteSlots);

module.exports = router;