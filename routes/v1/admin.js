var express = require('express');
var multer = require('multer');

var Upload = require('../../service/upload');

var router = express.Router();

var storage1 = multer.memoryStorage();
var upload1 = multer({ storage: storage1 });

var storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        // cb(null, path.join(__dirname, 'uploads/stolen'));
        cb(null, "uploads/assessment_audios");
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = "";
        if (file.mimetype === "audio/mp3") {
            filetype = "mp3";
        }
        if (file.mimetype === "audio/mpeg") {
            filetype = "mpeg";
        }
        pro_audio =
            "user-" +
            Math.floor(100000 + Math.random() * 900000) +
            "-" +
            Date.now() +
            "." +
            filetype;

        audio = pro_audio;

        console.log("audio_array", audio);
        cb(null, pro_audio);
    },
});
var upload2 = multer({ storage: storage2 });

/** -------------------- Controllers section -------------------- */
const HOME_BANNER = require('../../controllers/admin/HomeBanner');
const ASSESSMENT_QSTN = require('../../controllers/admin/AssessmentQstn');
const HIV_INFORMATION = require('../../controllers/admin/HIVInformation');
const PARTNER_INFO = require('../../controllers/admin/PartnerInfo');
const RESOURCE_INFO = require('../../controllers/admin/Resources');
/** ------------------ Controllers section end ------------------ */

router.post('/image-upload', upload1.single("image"), Upload.segmentImage);
router.post('/audio-upload', upload2.single("audio"), Upload.uploadAudio);

router.post('/home-banner', HOME_BANNER.createBanner); // 2nd argument to .post() - upload.single("audio")
router.get('/home-banner', HOME_BANNER.getBanner);
router.get('/home-banner/:id', HOME_BANNER.getBannerById);

router.post('/assessment-qstn', ASSESSMENT_QSTN.createQstn);
router.get('/assessment-qstn', ASSESSMENT_QSTN.getAllQstns);
router.get('/assessment-qstn/:id', ASSESSMENT_QSTN.getQstnById);
router.delete('/assessment-qstn/:id', ASSESSMENT_QSTN.deleteQstn);

router.post('/hiv-information', HIV_INFORMATION.addSegment);
router.get('/hiv-information', HIV_INFORMATION.viewAllSegments);
router.get('/hiv-information/:id', HIV_INFORMATION.viewSegmentById);
router.put('/hiv-information/:id', HIV_INFORMATION.editSegment);
router.delete('/hiv-information/:id', HIV_INFORMATION.deleteSegment);

router.post('/partner-info', PARTNER_INFO.addPartner);
router.get('/partner-info', PARTNER_INFO.viewAllPartners);
router.get('/partner-info/:id', PARTNER_INFO.viewPartnerById);
router.put('/partner-info/:id', PARTNER_INFO.editPartner);
router.delete('/partner-info/:id', PARTNER_INFO.deletePartner);

router.post('/resource', RESOURCE_INFO.addResource);
router.get('/resource', RESOURCE_INFO.viewAllResources);
router.get('/resource/:id', RESOURCE_INFO.viewResourceById);
router.put('/resource/:id', RESOURCE_INFO.editResorce);
router.delete('/resource/:id', RESOURCE_INFO.deleteResource);

module.exports = router;