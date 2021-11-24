var express = require('express');
var multer = require('multer');

var router = express.Router();

var storage = multer.diskStorage({
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
var upload = multer({ storage: storage });


/**==================== Controller section ====================*/
const ADMIN = require('../../controllers/auth/Admin');
const USER_ASSESSMENT_TEST = require('../../controllers/user/AssessmentTest');
const HOME_BANNER = require('../../controllers/user/HomeBanner');
const HIV_INFORMATION = require('../../controllers/user/HIVInformation');
const PARTNER_INFO = require('../../controllers/user/PartnerInfo');
const QUOTES_INFO = require('../../controllers/user/Quotes');
const ABOUT_US_INFO = require('../../controllers/user/AboutUs');
const PRIVACY_INFO = require('../../controllers/user/PrivacyNDataPolicy');
const CONTACT_INFO = require('../../controllers/user/ContactInfo');
const USER_ENQUIRY = require('../../controllers/user/UserEnquiry');
const FAQ = require('../../controllers/user/FAQ');
const BLOG = require('../../controllers/user/Blog');
const TERMS_N_CONDITN = require('../../controllers/user/TermsNConditn');
const CLINIC_CATEGORY = require('../../controllers/user/ClinicCategory');
const CLINICS = require("../../controllers/user/Clinic");
/**------------------ Clinic dashboard------------------------ */
const CLINIC_LOGIN = require('../../controllers/auth/Clinic');
const CLINIC_SLOT = require('../../controllers/user/slots/ClinicSlotAction');
const USER_SLOT_ACTION = require('../../controllers/user/slots/UserSlotActions');
/**---------------- Clinic dashboard end --------------------- */
/**================== Controller section end ==================*/

const middleware = require('../../service/middleware').middleware;

const AdminRoute = require('./admin');
const ClinicRoute = require('./clinic');

/**====================== without login url ====================== */
// GET home page
router.get('/', (req, res, next) => {
    res.send({ status: false });
});
router.post('/admin/register', ADMIN.register);
router.post('/admin/login', ADMIN.login);

router.post('/clinics/login', CLINIC_LOGIN.login);

router.post('/user/audio-upload', upload.single("audio"), USER_ASSESSMENT_TEST.uploadAudio2);

router.get('/user/home-banner', HOME_BANNER.getBanner);
router.get('/user/home-banner/:id', HOME_BANNER.getBannerById);

router.get('/user/hiv-information', HIV_INFORMATION.viewAllSegments);
router.get('/user/hiv-information/:id', HIV_INFORMATION.viewSegmentById);

router.get('/user/partner-info', PARTNER_INFO.viewAllPartners);
router.get('/user/partner-info/:id', PARTNER_INFO.viewPartnerById);

router.get('/user/quote', QUOTES_INFO.viewAllQuotes);
router.get('/user/quote/:id', QUOTES_INFO.viewQuoteById);

router.get('/user/about-us', ABOUT_US_INFO.viewAllSegments);
router.get('/user/about-us/:id', ABOUT_US_INFO.viewSegmentById);
router.get('/user/states', ABOUT_US_INFO.viewAllstate);
router.post('/user/states', ABOUT_US_INFO.addstate);
router.post('/user/qstn_survey', ABOUT_US_INFO.addsurvey);

router.get('/user/privacy-and-data-policy', PRIVACY_INFO.viewAllSegments);
router.get('/user/privacy-and-data-policy/:id', PRIVACY_INFO.viewSegmentById);

router.get('/user/contact-info', CONTACT_INFO.viewAllInfos);
router.get('/user/contact-info/:id', CONTACT_INFO.viewInfoById);

router.post('/user/enquiry', USER_ENQUIRY.addEnquiry);

router.get('/user/faq', FAQ.viewAllFAQs);
router.get('/user/faq/:id', FAQ.viewFAQById);

router.get('/user/blog', BLOG.viewAllBlogs);
router.get('/user/blog/:id', BLOG.viewBlogById);

router.get('/user/terms-and-condition', TERMS_N_CONDITN.viewAllTerms);
router.get('/user/terms-and-condition/:id', TERMS_N_CONDITN.viewTermsById);

router.get('/user/clinic-category', CLINIC_CATEGORY.getAllCategories);
router.get('/user/clinic-category/:id', CLINIC_CATEGORY.getCategoryById);

router.get('/user/clinic', CLINICS.getAllClinics);
router.get('/user/clinic/:id', CLINICS.getClinicById);
router.get('/user/clinic-by-category', CLINICS.getClinicByCategory);

router.get('/user/slot', CLINIC_SLOT.viewAllSlotsPerDay);

router.post('/user/book-appointment', USER_SLOT_ACTION.bookSlot);
/**==================== without login url end =====================*/

router.use(middleware);

router.use('/admin', AdminRoute);
router.use('/clinics', ClinicRoute);

module.exports = router;