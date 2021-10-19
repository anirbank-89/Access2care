var express = require('express');
var router = express.Router();

/** -------------------- Controllers section -------------------- */
const HOME_BANNER = require('../../controllers/admin/HomeBanner');
const ASSESSMENT_QSTN = require('../../controllers/admin/AssessmentQstn');
/** ------------------ Controllers section end ------------------ */

router.post('/home-banner', HOME_BANNER.createBanner);
router.get('/home-banner/:id', HOME_BANNER.getBannerById);

router.post('/assessment-qstn', ASSESSMENT_QSTN.createQstn);
router.get('/assessment-qstn', ASSESSMENT_QSTN.getAllQstns);
router.get('/assessment-qstn/:id', ASSESSMENT_QSTN.getQstnById);
router.delete('/assessment-qstn/:id', ASSESSMENT_QSTN.deleteQstn);

module.exports = router;