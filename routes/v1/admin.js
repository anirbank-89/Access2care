var express = require('express');
// var multer = require('multer');

var router = express.Router();

// var storage = multer.memoryStorage();
// var upload = multer({storage: storage});

/** -------------------- Controllers section -------------------- */
const HOME_BANNER = require('../../controllers/admin/HomeBanner');
const ASSESSMENT_QSTN = require('../../controllers/admin/AssessmentQstn');
const HIV_INFORMATION = require('../../controllers/admin/HIVInformation');
/** ------------------ Controllers section end ------------------ */

router.post('/home-banner', HOME_BANNER.createBanner); // 2nd argument to .post() - upload.single("audio")
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

module.exports = router;