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
router.put('/clinic/:id', CLINIC.editClinic);
router.get('/clinic/:id', CLINIC.getClinicById);
router.put('/clinic/update-password/:id', CLINIC.updatePassword);

router.post('/slot', CLINIC_SLOT.addSlot);
router.get('/slot', CLINIC_SLOT.viewSlotsPerClinic);
router.delete('/slot/:id', CLINIC_SLOT.deleteSlot);

module.exports = router;